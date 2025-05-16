import React from 'react';
import { format } from 'date-fns';
import { Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Patient } from '@/lib/types';

interface InsuranceInfoProps {
  patient: Patient;
  onUpdate: () => void;
}

export function InsuranceInfo({ patient, onUpdate }: InsuranceInfoProps) {
  const isExpired = patient.insurance?.endDate && 
    new Date(patient.insurance.endDate) < new Date();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Insurance Information</CardTitle>
            <CardDescription>Patient's insurance coverage details</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onUpdate}>
            Update Insurance
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {patient.insurance ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium">{patient.insurance.provider}</span>
              </div>
              <Badge variant={isExpired ? 'destructive' : 'secondary'}>
                {isExpired ? 'Expired' : 'Active'}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Policy Number</div>
                <div className="font-medium">{patient.insurance.policyNumber}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Expiry Date</div>
                <div className="font-medium">
                  {format(new Date(patient.insurance.endDate), 'MMM d, yyyy')}
                </div>
              </div>
            </div>
            {isExpired && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-2 text-sm text-destructive">
                <AlertTriangle className="h-4 w-4" />
                <span>Insurance policy has expired. Please update the information.</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Shield className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-medium">No Insurance Information</h3>
            <p className="text-sm text-muted-foreground">
              Add insurance details to track patient's coverage
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}