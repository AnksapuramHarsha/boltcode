import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
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
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const medicalRecordFormSchema = z.object({
  patientId: z.string().min(1, 'Patient is required'),
  doctorId: z.string().min(1, 'Doctor is required'),
  appointmentId: z.string().optional(),
  diagnosis: z.string().min(1, 'Diagnosis is required'),
  symptoms: z.array(z.string()).min(1, 'At least one symptom is required'),
  treatment: z.string().min(1, 'Treatment is required'),
  notes: z.string().optional(),
  followUpDate: z.date().optional(),
  vitals: z.object({
    bloodPressure: z.string().optional(),
    heartRate: z.number().optional(),
    temperature: z.number().optional(),
    respiratoryRate: z.number().optional(),
    oxygenSaturation: z.number().optional(),
    weight: z.number().optional(),
    height: z.number().optional(),
  }).optional(),
});

type FormValues = z.infer<typeof medicalRecordFormSchema>;

interface MedicalRecordFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;
}

// Mock data for development
const mockPatients = Array(5).fill(null).map((_, i) => ({
  id: `p-${i + 1}`,
  name: `Patient ${i + 1}`,
}));

const mockDoctors = Array(4).fill(null).map((_, i) => ({
  id: `d-${i + 1}`,
  name: `Dr. ${['Sarah Johnson', 'Michael Smith', 'Emily Brown', 'David Wilson'][i]}`,
}));

const commonSymptoms = [
  'Fever',
  'Headache',
  'Cough',
  'Fatigue',
  'Nausea',
  'Body ache',
  'Dizziness',
  'Shortness of breath',
];

export function MedicalRecordForm({ onSubmit, defaultValues }: MedicalRecordFormProps) {
  const [symptoms, setSymptoms] = React.useState<string[]>(defaultValues?.symptoms || []);
  const [newSymptom, setNewSymptom] = React.useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(medicalRecordFormSchema),
    defaultValues: {
      patientId: defaultValues?.patientId || '',
      doctorId: defaultValues?.doctorId || '',
      appointmentId: defaultValues?.appointmentId || '',
      diagnosis: defaultValues?.diagnosis || '',
      symptoms: symptoms,
      treatment: defaultValues?.treatment || '',
      notes: defaultValues?.notes || '',
      followUpDate: defaultValues?.followUpDate,
      vitals: defaultValues?.vitals || {
        bloodPressure: '',
        heartRate: 0,
        temperature: 0,
        respiratoryRate: 0,
        oxygenSaturation: 0,
        weight: 0,
        height: 0,
      },
    },
  });

  const addSymptom = () => {
    if (newSymptom && !symptoms.includes(newSymptom)) {
      const updatedSymptoms = [...symptoms, newSymptom];
      setSymptoms(updatedSymptoms);
      form.setValue('symptoms', updatedSymptoms);
      setNewSymptom('');
    }
  };

  const removeSymptom = (symptom: string) => {
    const updatedSymptoms = symptoms.filter(s => s !== symptom);
    setSymptoms(updatedSymptoms);
    form.setValue('symptoms', updatedSymptoms);
  };

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
          <h3 className="font-medium">Symptoms</h3>
          <div className="flex gap-2">
            <Input
              value={newSymptom}
              onChange={(e) => setNewSymptom(e.target.value)}
              placeholder="Enter symptom"
            />
            <Button type="button" onClick={addSymptom}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => (
              <Button
                key={symptom}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!symptoms.includes(symptom)) {
                    const updatedSymptoms = [...symptoms, symptom];
                    setSymptoms(updatedSymptoms);
                    form.setValue('symptoms', updatedSymptoms);
                  }
                }}
              >
                {symptom}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {symptoms.map((symptom) => (
              <div
                key={symptom}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm"
              >
                <span>{symptom}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0"
                  onClick={() => removeSymptom(symptom)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>

        <FormField
          control={form.control}
          name="diagnosis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diagnosis</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter diagnosis"
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
          name="treatment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Treatment Plan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter treatment plan"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="font-medium">Vitals</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="vitals.bloodPressure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Pressure</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., 120/80" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vitals.heartRate"
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
              name="vitals.temperature"
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
              name="vitals.oxygenSaturation"
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
          </div>
        </div>

        <FormField
          control={form.control}
          name="followUpDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Follow-up Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  {/* <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  /> */}
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any additional notes"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="submit">Create Record</Button>
        </div>
      </form>
    </Form>
  );
}