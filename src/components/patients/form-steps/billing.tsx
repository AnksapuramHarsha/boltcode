import React from 'react';
import { PatientFormStep } from '../patient-form-step';
import { usePatientForm } from '../patient-form-context';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export function BillingStep() {
  const { form } = usePatientForm();
  const billingTypes = ['General', 'Insurance', 'Corporate', 'Cash'];

  return (
    <PatientFormStep
      title="8. Billing Information"
      description="Patient billing and referral details"
    >
      <div className="grid md:grid-cols-3 gap-4">
        {/* Correct path: billingReferral.billingType */}
        <FormField
          control={form.control}
          name="billingReferral.billingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Type</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(val || null)}
                value={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select billing type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {billingTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Correct path: billingReferral.referredBy */}
        <FormField
          control={form.control}
          name="billingReferral.referredBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referred By (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter referring person or source"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </PatientFormStep>
  );
}
