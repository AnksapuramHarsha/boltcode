import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { VitalsForm } from '@/components/vitals/vitals-form';

interface VitalRecord {
  id: string;
  patientId: string;
  patientName: string;
  recordedAt: Date;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  recordedBy: string;
}

// Mock data
const mockVitals: VitalRecord[] = Array(15).fill(null).map((_, i) => ({
  id: `v-${i + 1}`,
  patientId: `P${1000 + i}`,
  patientName: `Patient ${i + 1}`,
  recordedAt: new Date(Date.now() - Math.random() * 10000000000),
  bloodPressure: `${110 + Math.floor(Math.random() * 30)}/${70 + Math.floor(Math.random() * 20)}`,
  heartRate: 60 + Math.floor(Math.random() * 40),
  temperature: 36.5 + Math.random() * 2,
  respiratoryRate: 12 + Math.floor(Math.random() * 8),
  oxygenSaturation: 95 + Math.floor(Math.random() * 5),
  recordedBy: ['Dr. Sarah', 'Nurse John', 'Dr. Emily'][i % 3],
}));

function VitalsPage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [vitals, setVitals] = React.useState<VitalRecord[]>(mockVitals);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [dateFilter, setDateFilter] = React.useState('all');

  const filteredVitals = React.useMemo(() => {
    return vitals.filter(record => {
      const matchesSearch = 
        record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.patientName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const today = new Date();
      const recordDate = new Date(record.recordedAt);
      const matchesDate = dateFilter === 'all' ||
        (dateFilter === 'today' && recordDate.toDateString() === today.toDateString()) ||
        (dateFilter === 'week' && recordDate >= new Date(today.setDate(today.getDate() - 7))) ||
        (dateFilter === 'month' && recordDate >= new Date(today.setMonth(today.getMonth() - 1)));

      return matchesSearch && matchesDate;
    });
  }, [vitals, searchTerm, dateFilter]);

  const handleRecordVitals = async (data: any) => {
    const newRecord: VitalRecord = {
      id: `v-${vitals.length + 1}`,
      patientId: data.patientId,
      patientName: `Patient ${vitals.length + 1}`, // In real app, get from patient data
      recordedAt: new Date(),
      bloodPressure: data.bloodPressure,
      heartRate: data.heartRate,
      temperature: data.temperature,
      respiratoryRate: data.respiratoryRate,
      oxygenSaturation: data.oxygenSaturation,
      recordedBy: 'Dr. Sarah', // In real app, get from logged-in user
    };

    setVitals([newRecord, ...vitals]);
    setDialogOpen(false);
  };

  const getVitalStatus = (record: VitalRecord) => {
    const hasAbnormal = 
      record.heartRate < 60 || record.heartRate > 100 ||
      record.temperature < 36.5 || record.temperature > 37.5 ||
      record.respiratoryRate < 12 || record.respiratoryRate > 20 ||
      record.oxygenSaturation < 95;

    return hasAbnormal ? "abnormal" : "normal";
  };

  return (
    <ScrollArea className="h-[calc(100vh-10rem)]">
      <div className="space-y-6 px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vitals</h1>
            <p className="text-muted-foreground">Record and monitor patient vital signs</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Record Vitals
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Record Patient Vitals</DialogTitle>
                <DialogDescription>
                  Enter vital signs measurements for the patient.
                </DialogDescription>
              </DialogHeader>
              <VitalsForm onSubmit={handleRecordVitals} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>BP</TableHead>
                <TableHead>HR</TableHead>
                <TableHead>Temp</TableHead>
                <TableHead>RR</TableHead>
                <TableHead>SpO2</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recorded By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVitals.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.patientName}</div>
                      <div className="text-sm text-muted-foreground">{record.patientId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{record.recordedAt.toLocaleTimeString()}</TableCell>
                  <TableCell>{record.bloodPressure}</TableCell>
                  <TableCell>{record.heartRate}</TableCell>
                  <TableCell>{record.temperature.toFixed(1)}°C</TableCell>
                  <TableCell>{record.respiratoryRate}</TableCell>
                  <TableCell>{record.oxygenSaturation}%</TableCell>
                  <TableCell>
                    <Badge
                      variant={getVitalStatus(record) === "normal" ? "default" : "destructive"}
                    >
                      {getVitalStatus(record)}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.recordedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ScrollArea>
  );
}

export default VitalsPage;