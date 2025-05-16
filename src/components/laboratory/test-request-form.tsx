import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const testRequestFormSchema = z.object({
  patientId: z.string().min(1, 'Patient is required'),
  doctorId: z.string().min(1, 'Doctor is required'),
  testName: z.string().min(1, 'Test name is required'),
  testType: z.string().min(1, 'Test type is required'),
  priority: z.enum(['routine', 'urgent', 'stat']),
  instructions: z.string().optional(),
  clinicalNotes: z.string().optional(),
  sampleType: z.string().min(1, 'Sample type is required'),
  fastingRequired: z.boolean(),
});

type FormValues = z.infer<typeof testRequestFormSchema>;

interface TestRequestFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;
}

// Mock data for development
const testTypes = [
  'Hematology',
  'Biochemistry',
  'Microbiology',
  'Pathology',
  'Immunology',
  'Serology',
];

const sampleTypes = [
  'Blood',
  'Urine',
  'Stool',
  'CSF',
  'Tissue',
  'Swab',
];

export function TestRequestForm({ onSubmit, defaultValues }: TestRequestFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(testRequestFormSchema),
    defaultValues: {
      patientId: defaultValues?.patientId || '',
      doctorId: defaultValues?.doctorId || '',
      testName: defaultValues?.testName || '',
      testType: defaultValues?.testType || '',
      priority: defaultValues?.priority || 'routine',
      instructions: defaultValues?.instructions || '',
      clinicalNotes: defaultValues?.clinicalNotes || '',
      sampleType: defaultValues?.sampleType || '',
      fastingRequired: defaultValues?.fastingRequired || false,
    },
  });

  // Mock data for development
  const mockPatients = Array(5).fill(null).map((_, i) => ({
    id: `p-${i + 1}`,
    name: `Patient ${i + 1}`,
  }));

  const mockDoctors = Array(4).fill(null).map((_, i) => ({
    id: `d-${i + 1}`,
    name: `Dr. ${['Sarah Johnson', 'Michael Smith', 'Emily Brown', 'David Wilson'][i]}`,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="patientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockPatients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="doctorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requesting Doctor</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockDoctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="testName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter test name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="testType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select test type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {testTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="routine">Routine</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="stat">STAT</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sampleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sample Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sample type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sampleTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="fastingRequired"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Fasting Required
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any special instructions"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clinicalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clinical Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter clinical notes and observations"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="submit">Request Test</Button>
        </div>
      </form>
    </Form>
  );
}