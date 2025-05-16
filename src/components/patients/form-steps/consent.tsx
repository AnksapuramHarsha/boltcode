import React from 'react';
import { usePatientForm } from '../patient-form-context';
import { PatientFormStep } from '../patient-form-step';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export function ConsentStep() {
  const { form } = usePatientForm();
  const shareWithOther = form.watch('informationSharing.shareWithOther');

  return (
    <PatientFormStep
      title="7.Consent Information"
      description="Information sharing preferences"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-base">1. Information Sharing Consent</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Share with Spouse */}
            <FormField
              control={form.control}
              name="informationSharing.shareWithSpouse"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="text-sm font-medium">Share with Spouse</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Share with Children */}
            <FormField
              control={form.control}
              name="informationSharing.shareWithChildren"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="text-sm font-medium">Share with Children</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Share with Caregiver */}
            <FormField
              control={form.control}
              name="informationSharing.shareWithCaregiver"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="text-sm font-medium">Share with Caregiver</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Share with Other */}
            <FormField
              control={form.control}
              name="informationSharing.shareWithOther"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="text-sm font-medium">Share with Others</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Optional: Specify Other (conditional) */}
          {shareWithOther && (
            <FormField
              control={form.control}
              name="informationSharing.shareWithOtherDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Specify Other Person/Relationship
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
    </PatientFormStep>
  );
}
