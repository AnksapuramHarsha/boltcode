import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Trash2 } from 'lucide-react';
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

const prescriptionFormSchema = z.object({
  patientId: z.string().min(1, 'Patient is required'),
  doctorId: z.string().min(1, 'Doctor is required'),
  medicines: z.array(z.object({
    medicineId: z.string().min(1, 'Medicine is required'),
    medicineName: z.string().min(1, 'Medicine name is required'),
    dosage: z.string().min(1, 'Dosage is required'),
    frequency: z.string().min(1, 'Frequency is required'),
    duration: z.string().min(1, 'Duration is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
  })).min(1, 'At least one medicine is required'),
  instructions: z.string().min(1, 'Instructions are required'),
});

type FormValues = z.infer<typeof prescriptionFormSchema>;

interface PrescriptionFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;
}

// Mock data for development
const mockMedicines = [
  { id: 'm1', name: 'Paracetamol', dosages: ['500mg', '650mg'] },
  { id: 'm2', name: 'Amoxicillin', dosages: ['250mg', '500mg'] },
  { id: 'm3', name: 'Omeprazole', dosages: ['20mg', '40mg'] },
  { id: 'm4', name: 'Metformin', dosages: ['500mg', '850mg'] },
];

const frequencies = [
  'Once daily',
  'Twice daily',
  'Three times daily',
  'Four times daily',
  'Every 6 hours',
  'Every 8 hours',
  'When needed',
];

const durations = [
  '3 days',
  '5 days',
  '7 days',
  '10 days',
  '14 days',
  '1 month',
];

export function PrescriptionForm({ onSubmit, defaultValues }: PrescriptionFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(prescriptionFormSchema),
    defaultValues: {
      patientId: defaultValues?.patientId || '',
      doctorId: defaultValues?.doctorId || '',
      medicines: defaultValues?.medicines || [
        {
          medicineId: '',
          medicineName: '',
          dosage: '',
          frequency: '',
          duration: '',
          quantity: 1,
        },
      ],
      instructions: defaultValues?.instructions || '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'medicines',
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
                <FormLabel>Doctor</FormLabel>
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
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Medicines</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({
                medicineId: '',
                medicineName: '',
                dosage: '',
                frequency: '',
                duration: '',
                quantity: 1,
              })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Medicine
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Medicine {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  disabled={index === 0 && fields.length === 1}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`medicines.${index}.medicineId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medicine</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const medicine = mockMedicines.find(m => m.id === value);
                          field.onChange(value);
                          form.setValue(`medicines.${index}.medicineName`, medicine?.name || '');
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select medicine" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockMedicines.map((medicine) => (
                            <SelectItem key={medicine.id} value={medicine.id}>
                              {medicine.name}
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
                  name={`medicines.${index}.dosage`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dosage</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select dosage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockMedicines
                            .find(m => m.id === form.getValues(`medicines.${index}.medicineId`))
                            ?.dosages.map((dosage) => (
                              <SelectItem key={dosage} value={dosage}>
                                {dosage}
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
                  name={`medicines.${index}.frequency`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequency</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {frequencies.map((frequency) => (
                            <SelectItem key={frequency} value={frequency}>
                              {frequency}
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
                  name={`medicines.${index}.duration`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {durations.map((duration) => (
                            <SelectItem key={duration} value={duration}>
                              {duration}
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
                  name={`medicines.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter instructions for the patient"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="submit">Create Prescription</Button>
        </div>
      </form>
    </Form>
  );
}