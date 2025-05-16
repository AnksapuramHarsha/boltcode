import React from 'react';
import { PatientFormStep } from '../patient-form-step';
import { usePatientForm } from '../patient-form-context';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { mockData } from '@/lib/mock-data';

export function MedicalInformationStep() {
  const { form } = usePatientForm();

  const [newAllergy, setNewAllergy] = React.useState('');
  const [newCondition, setNewCondition] = React.useState('');
  const [newMedication, setNewMedication] = React.useState('');

  const allergies = form.watch('medicalInformation.allergies') || [];
  const conditions = form.watch('medicalInformation.chronicConditions') || [];
  const medications = form.watch('medicalInformation.currentMedications') || [];

  const addAllergy = () => {
    if (newAllergy.trim()) {
      form.setValue('medicalInformation.allergies', [...allergies, newAllergy.trim()]);
      setNewAllergy('');
    }
  };

  const removeAllergy = (index: number) => {
    form.setValue('medicalInformation.allergies', allergies.filter((_, i) => i !== index));
  };

  const addCondition = () => {
    if (newCondition.trim()) {
      form.setValue('medicalInformation.chronicConditions', [...conditions, newCondition.trim()]);
      setNewCondition('');
    }
  };

  const removeCondition = (index: number) => {
    form.setValue('medicalInformation.chronicConditions', conditions.filter((_, i) => i !== index));
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      form.setValue('medicalInformation.currentMedications', [...medications, newMedication.trim()]);
      setNewMedication('');
    }
  };

  const removeMedication = (index: number) => {
    form.setValue('medicalInformation.currentMedications', medications.filter((_, i) => i !== index));
  };

  return (
    <PatientFormStep
      title="Medical Information"
      description="Patient's medical history and current conditions"
    >
      <div className="space-y-6">
        {/* Allergies */}
        <div className="space-y-4">
          <h3 className="font-medium">Allergies</h3>
          <div className="flex gap-2">
            <Input
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              placeholder="Enter allergy"
            />
            <Button type="button" onClick={addAllergy}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {allergies.map((allergy, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                <span>{allergy}</span>
                <Button variant="ghost" size="sm" onClick={() => removeAllergy(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Chronic Conditions */}
        <div className="space-y-4">
          <h3 className="font-medium">Chronic Conditions</h3>
          <div className="flex gap-2">
            <Input
              value={newCondition}
              onChange={(e) => setNewCondition(e.target.value)}
              placeholder="Enter condition"
            />
            <Button type="button" onClick={addCondition}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {conditions.map((condition, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                <span>{condition}</span>
                <Button variant="ghost" size="sm" onClick={() => removeCondition(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Current Medications */}
        <div className="space-y-4">
          <h3 className="font-medium">Current Medications</h3>
          <div className="flex gap-2">
            <Input
              value={newMedication}
              onChange={(e) => setNewMedication(e.target.value)}
              placeholder="Enter medication"
            />
            <Button type="button" onClick={addMedication}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {medications.map((medication, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                <span>{medication}</span>
                <Button variant="ghost" size="sm" onClick={() => removeMedication(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Lifestyle Information */}
        <div className="space-y-4">
          <h3 className="font-medium">Lifestyle Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="medicalInformation.lifestyle.smoking"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Smoking</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicalInformation.lifestyle.alcohol"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Alcohol</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicalInformation.lifestyle.exercise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Frequency</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="occasionally">Occasionally</SelectItem>
                      <SelectItem value="regularly">Regularly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicalInformation.lifestyle.diet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diet Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select diet type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </PatientFormStep>
  );
}