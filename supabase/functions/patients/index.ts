import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    switch (req.method) {
      case 'POST': {
        const body = await req.json();
        
        // Start a transaction
        const { data, error } = await supabase.rpc('create_patient', {
          patient_data: body,
          user_id: user.id
        });

        if (error) throw error;

        return new Response(
          JSON.stringify({ data, error: null }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 201,
          }
        );
      }

      case 'GET': {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '10');
        const search = url.searchParams.get('search');
        const filter = url.searchParams.get('filter');

        let query = supabase
          .from('patients')
          .select(`
            *,
            contacts:patient_contacts(*),
            addresses:patient_addresses(*),
            emergency_contacts:patient_emergency_contacts(*),
            demographics:patient_demographics(*),
            medical_info:patient_medical_info(*),
            insurance:patient_insurance(*),
            documents:patient_documents(*),
            consent:patient_consent(*),
            billing:patient_billing(*)
          `);

        if (id) {
          query = query.eq('id', id).single();
        } else {
          if (search) {
            query = query.or(`
              first_name.ilike.%${search}%,
              last_name.ilike.%${search}%,
              registration_number.ilike.%${search}%,
              abha_number.ilike.%${search}%
            `);
          }

          if (filter) {
            const filters = JSON.parse(filter);
            Object.entries(filters).forEach(([key, value]) => {
              query = query.eq(key, value);
            });
          }

          query = query
            .order('created_at', { ascending: false })
            .range((page - 1) * limit, page * limit - 1);
        }

        const { data, error, count } = await query;

        if (error) throw error;

        return new Response(
          JSON.stringify({ data, count, error: null }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      default:
        return new Response('Method not allowed', { status: 405 });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});