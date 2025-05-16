import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MedicalRecord } from '@/lib/types';
import { medicalRecordApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { MedicalRecordForm } from '@/components/medical-records/medical-record-form';

// Mock data for development
const mockRecords: MedicalRecord[] = Array(10).fill(null).map((_, i) => ({
  id: `mr-${i + 1}`,
  patientId: `Patient ${i + 1}`,
  doctorId: `Dr. ${['Sarah Johnson', 'Michael Smith', 'Emily Brown', 'David Wilson'][i % 4]}`,
  appointmentId: `apt-${i + 1}`,
  date: new Date(2024, 0, 1 + i),
  diagnosis: ['Hypertension', 'Diabetes Type 2', 'Upper Respiratory Infection', 'Gastritis'][i % 4],
  symptoms: ['Fever', 'Headache', 'Fatigue'].slice(0, (i % 3) + 1),
  treatment: 'Prescribed medication and rest',
  notes: 'Follow up in 2 weeks',
  createdAt: new Date(2024, 0, 1),
  updatedAt: new Date(),
}));

export default function MedicalRecords() {
  const { toast } = useToast();
  const [records, setRecords] = React.useState<MedicalRecord[]>(mockRecords);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [dateFilter, setDateFilter] = React.useState('all');
  const [doctorFilter, setDoctorFilter] = React.useState('all');
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // Filter records based on search term, date, and doctor
  const filteredRecords = React.useMemo(() => {
    return records.filter((record) => {
      const matchesSearch = 
        record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());

      const today = new Date();
      const recordDate = new Date(record.date);
      const matchesDate = dateFilter === 'all' ||
        (dateFilter === 'today' && recordDate.toDateString() === today.toDateString()) ||
        (dateFilter === 'week' && recordDate >= new Date(today.setDate(today.getDate() - 7))) ||
        (dateFilter === 'month' && recordDate >= new Date(today.setMonth(today.getMonth() - 1)));

      const matchesDoctor = 
        doctorFilter === 'all' || record.doctorId === doctorFilter;

      return matchesSearch && matchesDate && matchesDoctor;
    });
  }, [records, searchTerm, dateFilter, doctorFilter]);

  const handleCreateRecord = async (data: any) => {
    try {
      // In a real app, this would call the API
      // await medicalRecordApi.create(data);
      
      // For now, just simulate adding to the list
      const newRecord: MedicalRecord = {
        id: `mr-${records.length + 1}`,
        patientId: data.patientId,
        doctorId: data.doctorId,
        appointmentId: data.appointmentId,
        date: new Date(),
        diagnosis: data.diagnosis,
        symptoms: data.symptoms,
        treatment: data.treatment,
        notes: data.notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setRecords([newRecord, ...records]);
      setDialogOpen(false);
      
      toast({
        title: 'Success',
        description: 'Medical record created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create medical record',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
          <p className="text-muted-foreground">Access and manage patient medical histories</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Record
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Create Medical Record</DialogTitle>
              <DialogDescription>
                Enter medical record details for the patient.
              </DialogDescription>
            </DialogHeader>
            <MedicalRecordForm onSubmit={handleCreateRecord} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search records..."
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
        <Select value={doctorFilter} onValueChange={setDoctorFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by doctor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Doctors</SelectItem>
            <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
            <SelectItem value="Dr. Michael Smith">Dr. Michael Smith</SelectItem>
            <SelectItem value="Dr. Emily Brown">Dr. Emily Brown</SelectItem>
            <SelectItem value="Dr. David Wilson">Dr. David Wilson</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex h-[400px] items-center justify-center">
          <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Symptoms</TableHead>
                <TableHead>Treatment</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.patientId}</TableCell>
                  <TableCell>{record.date.toLocaleDateString()}</TableCell>
                  <TableCell>{record.doctorId}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{record.diagnosis}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {record.symptoms.map((symptom, index) => (
                        <Badge key={index} variant="secondary">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[300px] truncate" title={record.treatment}>
                      {record.treatment}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}