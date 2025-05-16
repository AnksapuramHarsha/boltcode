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

const vitalsFormSchema = z.object({
  patientId: z.string().min(1, 'Patient is required'),
  bloodPressure: z.string().regex(/^\d{2,3}\/\d{2,3}$/, 'Invalid blood pressure format (e.g., 120/80)'),
  heartRate: z.number().min(30, 'Heart rate must be at least 30').max(200, 'Heart rate must be less than 200'),
  temperature: z.number().min(35, 'Temperature must be at least 35°C').max(42, 'Temperature must be less than 42°C'),
  respiratoryRate: z.number().min(8, 'Respiratory rate must be at least 8').max(40, 'Respiratory rate must be less than 40'),
  oxygenSaturation: z.number().min(50, 'Oxygen saturation must be at least 50%').max(100, 'Oxygen saturation must be less than 100%'),
  weight: z.number().min(0, 'Weight must be a positive number'),
  height: z.number().min(0, 'Height must be a positive number'),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof vitalsFormSchema>;

interface VitalsFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;
}

export function VitalsForm({ onSubmit, defaultValues }: VitalsFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(vitalsFormSchema),
    defaultValues: {
      patientId: defaultValues?.patientId || '',
      bloodPressure: defaultValues?.bloodPressure || '',
      heartRate: defaultValues?.heartRate || 72,
      temperature: defaultValues?.temperature || 37,
      respiratoryRate: defaultValues?.respiratoryRate || 16,
      oxygenSaturation: defaultValues?.oxygenSaturation || 98,
      weight: defaultValues?.weight || 0,
      height: defaultValues?.height || 0,
      notes: defaultValues?.notes || '',
    },
  });

  // Calculate BMI when weight or height changes
  const weight = form.watch('weight');
  const height = form.watch('height');
  const bmi = React.useMemo(() => {
    if (weight && height) {
      return (weight / Math.pow(height / 100, 2)).toFixed(1);
    }
    return '';
  }, [weight, height]);

  // Mock data for development
  const mockPatients = Array(5).fill(null).map((_, i) => ({
    id: `p-${i + 1}`,
    name: `Patient ${i + 1}`,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bloodPressure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Pressure (mmHg)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="120/80" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="heartRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heart Rate (bpm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="temperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature (°C)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="respiratoryRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Respiratory Rate (breaths/min)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="oxygenSaturation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Oxygen Saturation (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>BMI</FormLabel>
            <Input value={bmi} disabled />
          </FormItem>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any additional notes"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="submit">Record Vitals</Button>
        </div>
      </form>
    </Form>
  );
}