import React from 'react';

interface PatientFormStepProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function PatientFormStep({
  title,
  description,
  children
}: PatientFormStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}