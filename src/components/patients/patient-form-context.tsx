import React, { createContext, useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface PatientFormContextType {
  form: UseFormReturn<any>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const PatientFormContext = createContext<PatientFormContextType | undefined>(undefined);

export function PatientFormProvider({ 
  children,
  form,
  currentStep,
  setCurrentStep
}: { 
  children: React.ReactNode;
  form: UseFormReturn<any>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) {
  return (
    <PatientFormContext.Provider value={{ form, currentStep, setCurrentStep }}>
      {children}
    </PatientFormContext.Provider>
  );
}

export function usePatientForm() {
  const context = useContext(PatientFormContext);
  if (!context) {
    throw new Error('usePatientForm must be used within a PatientFormProvider');
  }
  return context;
}