import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Appointment } from '@/lib/types';
import { cn } from '@/lib/utils';

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
}

export function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>Appointments scheduled for today and upcoming days</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col space-y-2 rounded-md border p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{appointment.patientId}</div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "bg-opacity-10 capitalize",
                      getAppointmentStatusColor(appointment.status)
                    )}
                  >
                    {appointment.status}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>
                    {appointment.startTime} - {appointment.endTime}
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-3.5 w-3.5" />
                  <span>
                    {formatDate(appointment.date)} ({formatDistanceToNow(new Date(appointment.date), { addSuffix: true })})
                  </span>
                </div>
                <div className="mt-1 text-sm">
                  <span className="font-medium">Doctor:</span> {appointment.doctorId}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Type:</span> {appointment.type.replace('-', ' ')}
                </div>
                {appointment.reason && (
                  <div className="text-sm">
                    <span className="font-medium">Reason:</span> {appointment.reason}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function getAppointmentStatusColor(status: string): string {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    case 'no-show':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
  }
}