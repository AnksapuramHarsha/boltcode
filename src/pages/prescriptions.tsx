import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, FileText, Pill } from 'lucide-react';
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
import { Prescription } from '@/lib/types';
import { prescriptionApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { PrescriptionForm } from '@/components/prescriptions/prescription-form';

// Mock data for development
const mockPrescriptions: Prescription[] = Array(10).fill(null).map((_, i) => ({
  id: `p-${i + 1}`,
  medicalRecordId: `mr-${i + 1}`,
  patientId: `Patient ${i + 1}`,
  doctorId: `Dr. ${['Sarah Johnson', 'Michael Smith', 'Emily Brown', 'David Wilson'][i % 4]}`,
  date: new Date(2024, 0, 1 + i),
  status: ['created', 'dispensed', 'cancelled'][i % 3] as 'created' | 'dispensed' | 'cancelled',
  medicines: [
    {
      medicineId: `m-${i}-1`,
      medicineName: ['Paracetamol', 'Amoxicillin', 'Omeprazole', 'Metformin'][i % 4],
      dosage: ['500mg', '250mg', '20mg', '850mg'][i % 4],
      frequency: ['Once daily', 'Twice daily', 'Three times daily', 'Four times daily'][i % 4],
      duration: ['5 days', '7 days', '10 days', '14 days'][i % 4],
      quantity: 10 + (i * 2),
    },
    {
      medicineId: `m-${i}-2`,
      medicineName: ['Aspirin', 'Cetirizine', 'Pantoprazole', 'Metformin'][i % 4],
      dosage: ['100mg', '10mg', '40mg', '500mg'][i % 4],
      frequency: ['Once daily', 'Twice daily', 'When needed'][i % 3],
      duration: ['3 days', '5 days', '7 days'][i % 3],
      quantity: 5 + (i * 2),
    },
  ],
  instructions: 'Take medicines after meals',
  createdAt: new Date(2024, 0, 1),
  updatedAt: new Date(),
}));

export default function Prescriptions() {
  const { toast } = useToast();
  const [prescriptions, setPrescriptions] = React.useState<Prescription[]>(mockPrescriptions);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [dateFilter, setDateFilter] = React.useState('all');
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // Filter prescriptions based on search term, status, and date
  const filteredPrescriptions = React.useMemo(() => {
    return prescriptions.filter((prescription) => {
      const matchesSearch = 
        prescription.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.doctorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.medicines.some(med => 
          med.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus = 
        statusFilter === 'all' || prescription.status === statusFilter;

      const today = new Date();
      const prescriptionDate = new Date(prescription.date);
      const matchesDate = dateFilter === 'all' ||
        (dateFilter === 'today' && prescriptionDate.toDateString() === today.toDateString()) ||
        (dateFilter === 'week' && prescriptionDate >= new Date(today.setDate(today.getDate() - 7))) ||
        (dateFilter === 'month' && prescriptionDate >= new Date(today.setMonth(today.getMonth() - 1)));

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [prescriptions, searchTerm, statusFilter, dateFilter]);

  function getStatusColor(status: string): string {
    switch (status) {
      case 'created':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'dispensed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  }

  const handleCreatePrescription = async (data: Prescription) => {
    try {
      // In a real app, this would call the API
      // await prescriptionApi.create(data);
      
      // For now, just simulate adding to the list
      const newPrescription: Prescription = {
        id: `p-${prescriptions.length + 1}`,
        medicalRecordId: data.medicalRecordId,
        patientId: data.patientId,
        doctorId: data.doctorId,
        date: new Date(),
        status: 'created',
        medicines: data.medicines,
        instructions: data.instructions,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setPrescriptions([newPrescription, ...prescriptions]);
      setDialogOpen(false);
      
      toast({
        title: 'Success',
        description: 'Prescription created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create prescription',
        variant: 'destructive',
      });
    }
  };

  const handleDispensePrescription = async (id: string) => {
    try {
      // In a real app, this would call the API
      // await prescriptionApi.dispense(id);
      
      // For now, just simulate updating the status
      setPrescriptions(prev => 
        prev.map(p => 
          p.id === id ? { ...p, status: 'dispensed', updatedAt: new Date() } : p
        )
      );
      
      toast({
        title: 'Success',
        description: 'Prescription dispensed successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to dispense prescription',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
          <p className="text-muted-foreground">Manage patient prescriptions and medications</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Prescription
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Create New Prescription</DialogTitle>
              <DialogDescription>
                Enter prescription details for the patient.
              </DialogDescription>
            </DialogHeader>
            <PrescriptionForm onSubmit={handleCreatePrescription} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search prescriptions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="created">Created</SelectItem>
            <SelectItem value="dispensed">Dispensed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
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
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Medicines</TableHead>
                <TableHead>Instructions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell>{prescription.patientId}</TableCell>
                  <TableCell>{prescription.doctorId}</TableCell>
                  <TableCell>{prescription.date.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {prescription.medicines.map((medicine, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {medicine.medicineName} {medicine.dosage} - {medicine.frequency}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate" title={prescription.instructions}>
                      {prescription.instructions}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(prescription.status)}>
                      {prescription.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDispensePrescription(prescription.id)}
                        disabled={prescription.status !== 'created'}
                      >
                        Dispense
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </div>
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