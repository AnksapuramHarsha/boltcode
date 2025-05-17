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
import { Calendar } from '@/components/ui/calendar';

export function PersonalDetailsStep() {
  const { form } = usePatientForm();
  const birthDate = form.watch('dateOfBirth');

  return (
    <PatientFormStep title="1. Basic Info" description="">
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title/Salutation<span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Enter" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Mr">Mr</SelectItem>
                    <SelectItem value="Ms">Ms</SelectItem>
                    <SelectItem value="Mrs">Mrs</SelectItem>
                    <SelectItem value="Dr">Dr</SelectItem>
                    <SelectItem value="Master">Master</SelectItem>
                    <SelectItem value="Miss">Miss</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name<span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter or Select" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input {...field} onChange={e => field.onChange(e.target.value || null)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name<span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Enter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth<span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Calendar value={field.value} onChange={field.onChange} closeOnSelect />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender<span className="text-red-500">*</span></FormLabel>
                <Select onValueChange={field.onChange} value={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email ID<span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}

        <hr className="my-4" />
        <h2 className="text-lg font-semibold">2. Additional Patient Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="citizenship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Citizenship</FormLabel>
                <FormControl>
                  <Input {...field} onChange={e => field.onChange(e.target.value || null)} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="religion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Religion</FormLabel>
                <FormControl>
                  <Input {...field} onChange={e => field.onChange(e.target.value || null)} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="caste"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caste</FormLabel>
                <FormControl>
                  <Input {...field} onChange={e => field.onChange(e.target.value || null)} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation</FormLabel>
                <FormControl>
                  <Input {...field} onChange={e => field.onChange(e.target.value || null)} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Education</FormLabel>
                <FormControl>
                  <Input {...field} onChange={e => field.onChange(e.target.value || null)} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="annualIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Annual Income</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="identifierType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Government ID</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ABHA">ABHA</SelectItem>
                    <SelectItem value="Aadhar">Aadhar</SelectItem>
                    <SelectItem value="Passport">Passport</SelectItem>
                    <SelectItem value="Driving_License">Driving License</SelectItem>
                    <SelectItem value="PAN">PAN</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="identifierNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Government ID Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="facilityId"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input {...field} type="hidden" />
              </FormControl>
            </FormItem>
          )}
        />

        {birthDate && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Age</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold">{form.watch('age.years')}</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{form.watch('age.months')}</div>
                <div className="text-sm text-muted-foreground">Months</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{form.watch('age.days')}</div>
                <div className="text-sm text-muted-foreground">Days</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PatientFormStep>
  );
}
