import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Patient } from '@/lib/types';

interface RegistrationDetailsProps {
  patient: Patient;
}

export function RegistrationDetails({ patient }: RegistrationDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registration Details</CardTitle>
        <CardDescription>Patient registration information and history</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="registration">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="registration">Registration</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>
          
          <TabsContent value="registration" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Registration Date</div>
                <div className="text-sm text-muted-foreground">
                  {format(patient.createdAt, 'PPP p')}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Last Updated</div>
                <div className="text-sm text-muted-foreground">
                  {format(patient.updatedAt, 'PPP p')}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Registered By</div>
                <div className="text-sm text-muted-foreground">Dr. Sarah Johnson</div>
              </div>
              <div>
                <div className="text-sm font-medium">Registration Type</div>
                <Badge variant="outline">Walk-in</Badge>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="verification" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">ABHA Status</div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Verified
                </Badge>
              </div>
              <div>
                <div className="text-sm font-medium">Verification Method</div>
                <div className="text-sm text-muted-foreground">Aadhaar OTP</div>
              </div>
              <div>
                <div className="text-sm font-medium">Verified On</div>
                <div className="text-sm text-muted-foreground">
                  {format(patient.createdAt, 'PPP p')}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Verification Source</div>
                <div className="text-sm text-muted-foreground">ABDM</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}