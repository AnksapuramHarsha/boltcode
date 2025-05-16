import React from 'react';
import { usePatientForm } from '../patient-form-context';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export function DocumentsStep() {
  const { form } = usePatientForm();

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {/* ID Proof */}
        <FormField
          control={form.control}
          name="documents.idProof"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>ID Proof</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => onChange(e.target.files?.[0])}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Proof */}
        <FormField
          control={form.control}
          name="documents.addressProof"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Address Proof</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => onChange(e.target.files?.[0])}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Medical Records */}
        <FormField
          control={form.control}
          name="documents.medicalRecords"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Previous Medical Records</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => onChange(Array.from(e.target.files || []))}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
