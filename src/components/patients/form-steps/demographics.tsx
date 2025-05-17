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

export function DemographicsStep() {
  const { form } = usePatientForm();

  return (
    <PatientFormStep
      title="Demographics"
      description="Socioeconomic and demographic information"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Citizenship */}
          <FormField
            control={form.control}
            name="citizenship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Citizenship</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter citizenship"
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Religion */}
          <FormField
            control={form.control}
            name="religion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Religion</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter religion"
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Caste */}
          <FormField
            control={form.control}
            name="caste"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caste (Optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter caste"
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Occupation */}
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation (Optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter occupation"
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Education */}
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Education (Optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter education"
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Annual Income */}
          <FormField
            control={form.control}
            name="annualIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Annual Income (Optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter annual income"
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </PatientFormStep>
  );
}
