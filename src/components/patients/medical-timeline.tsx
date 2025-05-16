import React from 'react';
import { format } from 'date-fns';
import { FileText, Calendar, Pill, TestTube, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Patient } from '@/lib/types';

interface MedicalTimelineProps {
  patient: Patient;
}

export function MedicalTimeline({ patient }: MedicalTimelineProps) {
  const timelineItems = [
    ...patient.visits.map(visit => ({
      type: 'visit',
      date: visit.date,
      data: visit,
    })),
    // Add other types of events (prescriptions, lab tests, etc.)
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'visit':
        return <Calendar className="h-4 w-4" />;
      case 'prescription':
        return <Pill className="h-4 w-4" />;
      case 'lab_test':
        return <TestTube className="h-4 w-4" />;
      case 'vital_signs':
        return <Activity className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Timeline</CardTitle>
        <CardDescription>Patient's medical history and events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {timelineItems.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                  {getEventIcon(item.type)}
                </div>
                {index < timelineItems.length - 1 && (
                  <div className="w-px flex-1 bg-border" />
                )}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {item.type === 'visit' && `Visit with ${item.data.doctorName}`}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(item.date), 'MMM d, yyyy')}
                  </div>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {item.type === 'visit' && item.data.diagnosis}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}