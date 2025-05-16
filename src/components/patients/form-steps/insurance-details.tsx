import React from 'react';
import { usePatientForm } from '../patient-form-context';
import { PatientFormStep } from '../patient-form-step';
import { format } from 'date-fns';
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
import { Calendar } from '@/components/ui/calendar'; // your custom calendar component
import { mockData } from '@/lib/mock-data';

export function InsuranceDetailsStep() {
  const { form } = usePatientForm();

  return (
    <PatientFormStep
      title="6.Insurance Details"
      description="Patient's insurance information"
    >
      <div className="grid md:grid-cols-3 gap-4">
        {/* Insurance Provider */}
        <FormField
          control={form.control}
          name="insurance.insuranceProvider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insurance Provider</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockData.insuranceProviders.map((provider) => (
                    <SelectItem key={provider} value={provider}>
                      {provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Policy Number */}
        <FormField
          control={form.control}
          name="insurance.policyNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Policy Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter policy number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Coverage Amount */}
        <FormField
          control={form.control}
          name="insurance.coverageAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coverage Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Policy Start Date */}
        <FormField
          control={form.control}
          name="insurance.policyStartDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Policy Start Date</FormLabel>
              <FormControl>
                <Calendar
                  value={field.value}
                  onChange={field.onChange}
                  closeOnSelect
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Policy End Date */}
        <FormField
          control={form.control}
          name="insurance.policyEndDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Policy End Date</FormLabel>
              <FormControl>
                <Calendar
                  value={field.value}
                  onChange={field.onChange}
                  closeOnSelect
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
