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
import { Switch } from '@/components/ui/switch';

export function ContactInformationStep() {
  const { form } = usePatientForm();

  return (
    <PatientFormStep
      title="3. Contact Information"
      description="Contact details and preferences"
    >
      <div className="space-y-6">
        {/* Contact fields grid */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="contacts[0].phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                 Primary Phone Number<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    {...field}
                    placeholder="Enter phone number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contacts[0].mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secondary Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    {...field}
                    placeholder="Enter mobile number"
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="contacts[0].email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="Enter email"
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contacts[0].preferredContactMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Contact Mode</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(val || null)}
                  value={field.value ?? undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="contacts[0].phoneContactPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Contact Preference</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(val || null)}
                  value={field.value ?? undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Call">Call</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contacts[0].consentToShare"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-between">
                <FormLabel>Consent to Share</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
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
