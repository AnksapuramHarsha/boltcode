import React, { useEffect } from 'react';
import { Plus, Search, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { apiUrl } from '../utils/api';
// import { normalizeFormData } from '@/utils/normalize';


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
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { PatientForm } from '@/components/patients/patient-form';

export default function Patients() {
  const { toast } = useToast();
  const [patients, setPatients] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [uhidFilter, setUhidFilter] = React.useState('');
  const [mobileFilter, setMobileFilter] = React.useState('');
  const [schemeFilter, setSchemeFilter] = React.useState('all');
  const [abhaFilter, setAbhaFilter] = React.useState('');
  const [dateRange, setDateRange] = React.useState({ from: '', to: '' });
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingPatient, setEditingPatient] = React.useState<any | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl('/patients'));
      setPatients(response.data);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this patient?')) return;
    try {
      await axios.delete(apiUrl(`/patients/${id}`));
      setPatients(prev => prev.filter(p => p.patientId !== id));
      toast({ title: 'Deleted', description: 'Patient deleted successfully' });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to delete patient', variant: 'destructive' });
    }
  };

  const handleEdit = (patient: any) => {
    setEditingPatient(patient);
    setDialogOpen(true);
  };

  const handleFormSubmit = async (formData: any) => {
    console.log('Form Data-------------------:', formData);
    // const normalizedData = normalizeFormData(formData);
    //  console.log('Normalized data before sending:', normalizedData);
    try {
      if (editingPatient) {
        const updated = await axios.put(
          apiUrl(`/patients/${editingPatient.patientId}`),
          { ...formData, facilityId: "9f24a48c-53d4-4fc2-8c96-2f3ff2a2c556" }
        );
        setPatients(prev =>
          prev.map(p => (p.patientId === editingPatient.patientId ? updated.data : p))
        );
        toast({ title: 'Updated', description: 'Patient updated successfully' });
      } else {
        const created = await axios.post(
          apiUrl('/patients'),
          { ...formData, facilityId: "9f24a48c-53d4-4fc2-8c96-2f3ff2a2c556" }
        );
        setPatients(prev => [created.data, ...prev]);
        toast({ title: 'Created', description: 'New patient added successfully' });
      }
    } catch (err) {
      console.log('Error saving patient:', err);
      toast({ title: 'Error', description: 'Failed to save patient', variant: 'destructive' });
    } finally {
      setDialogOpen(false);
      setEditingPatient(null);
    }
  };

  const filteredPatients = React.useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.firstName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesUHID =
        !uhidFilter || patient.patientId?.includes(uhidFilter);

      const matchesMobile =
        !mobileFilter || patient.phone?.includes(mobileFilter);

      const matchesScheme =
        schemeFilter === 'all' || patient.insurance?.insuranceProvider === schemeFilter;

      const matchesABHA =
        !abhaFilter || (patient.identifierNumber && patient.identifierNumber.includes(abhaFilter));

      return matchesSearch && matchesUHID && matchesMobile && matchesScheme && matchesABHA;
    });
  }, [patients, searchTerm, uhidFilter, mobileFilter, schemeFilter, abhaFilter]);

  return (
    <div className="space-y-16">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground text-sm">Manage patient records and information</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(val) => {
          if (!val) setEditingPatient(null);
          setDialogOpen(val);
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPatient(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPatient ? 'Edit Patient' : 'Register New Patient'}</DialogTitle>
              <DialogDescription>
                {editingPatient ? 'Update the patient details below.' : 'Enter the patient\'s information.'}
              </DialogDescription>
            </DialogHeader>
            <PatientForm onSubmit={handleFormSubmit} initialValues={editingPatient} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Inputs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search patients..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Input placeholder="UHID" value={uhidFilter} onChange={(e) => setUhidFilter(e.target.value)} />
        <Input placeholder="Mobile Number" value={mobileFilter} onChange={(e) => setMobileFilter(e.target.value)} />
        <Input placeholder="Aadhar" value={abhaFilter} onChange={(e) => setAbhaFilter(e.target.value)} />
        <Select value={schemeFilter} onValueChange={setSchemeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Scheme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Schemes</SelectItem>
            <SelectItem value="National Insurance">National Insurance</SelectItem>
            <SelectItem value="Private">Private</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Input type="date" value={dateRange.from} onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))} className="w-1/2" />
          <Input type="date" value={dateRange.to} onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))} className="w-1/2" />
        </div>
      </div>

      {/* Patient Table */}
      {loading ? (
        <div className="flex h-[400px] items-center justify-center">
          <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border shadow-sm">
          <Table className="min-w-[900px] text-sm">
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>UHID</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Identifier</TableHead>
                <TableHead>Scheme</TableHead>
                <TableHead>Emergency Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.patientId}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://randomuser.me/api/portraits/${patient.gender?.toLowerCase() === 'male' ? 'men' : 'women'}/${Math.floor(Math.random() * 80)}.jpg`} alt={patient.fullName} />
                        <AvatarFallback>{patient.firstName?.[0]}{patient.lastName?.[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-0.5">
                        <div className="font-medium text-sm">{patient.fullName}</div>
                        <div className="text-xs text-muted-foreground truncate w-[200px]">{patient.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">UHID{patient.patientId?.slice(0, 8)}</TableCell>
                  <TableCell className="text-xs">{patient.phone}</TableCell>
                  <TableCell className="text-xs">{patient.identifierNumber}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      {patient.insurance?.insuranceProvider || 'General'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs">
                    {patient.emergencyContacts?.length > 0 ? (
                      <div>
                        <div>{patient.emergencyContacts[0].contactName}</div>
                        <div className="text-muted-foreground">{patient.emergencyContacts[0].phoneNumber}</div>
                      </div>
                    ) : (
                      <div className="text-muted-foreground">—</div>
                    )}
                  </TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(patient)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(patient.patientId)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
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
