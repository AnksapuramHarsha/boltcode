import React from 'react';
import { Line } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Patient } from '@/lib/types';

interface VitalSignsProps {
  patient: Patient;
}

export function VitalSigns({ patient }: VitalSignsProps) {
  const [timeRange, setTimeRange] = React.useState('week');

  const formatVitalData = (vitals: Patient['vitalSigns']) => {
    return vitals.map(vital => ({
      date: new Date(vital.date).toLocaleDateString(),
      bloodPressure: vital.bloodPressure,
      heartRate: vital.heartRate,
      temperature: vital.temperature,
      respiratoryRate: vital.respiratoryRate,
      oxygenSaturation: vital.oxygenSaturation,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Vital Signs</CardTitle>
            <CardDescription>Patient's vital signs history</CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24h</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Latest Readings</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border p-2">
                <div className="text-xs text-muted-foreground">Blood Pressure</div>
                <div className="text-lg font-semibold">
                  {patient.vitalSigns[0]?.bloodPressure || 'N/A'}
                </div>
              </div>
              <div className="rounded-lg border p-2">
                <div className="text-xs text-muted-foreground">Heart Rate</div>
                <div className="text-lg font-semibold">
                  {patient.vitalSigns[0]?.heartRate || 'N/A'} bpm
                </div>
              </div>
              <div className="rounded-lg border p-2">
                <div className="text-xs text-muted-foreground">Temperature</div>
                <div className="text-lg font-semibold">
                  {patient.vitalSigns[0]?.temperature || 'N/A'}°C
                </div>
              </div>
              <div className="rounded-lg border p-2">
                <div className="text-xs text-muted-foreground">SpO2</div>
                <div className="text-lg font-semibold">
                  {patient.vitalSigns[0]?.oxygenSaturation || 'N/A'}%
                </div>
              </div>
            </div>
          </div>
          <div className="h-[200px]">
            {/* Chart would go here - using Recharts */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}