import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, Mail, Phone } from 'lucide-react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Doctor } from '@/lib/types';
import { doctorApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { DoctorForm } from '@/components/doctors/doctor-form';

// Mock data for development
const mockDoctors: Doctor[] = Array(10).fill(null).map((_, i) => ({
  id: `d-${i + 1}`,
  userId: `Dr. ${['Sarah Johnson', 'Michael Smith', 'Emily Brown', 'David Wilson', 'Lisa Anderson'][i % 5]}`,
  specialization: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology'][i % 5],
  department: ['Internal Medicine', 'Surgery', 'Pediatrics', 'Emergency', 'Outpatient'][i % 5],
  licenseNumber: `MD${10000 + i}`,
  education: [
    'M.D. from Harvard Medical School',
    'Residency at Mayo Clinic',
    'Fellowship at Johns Hopkins',
  ],
  experience: 5 + i,
  availability: [
    {
      dayOfWeek: (i % 7) as 0 | 1 | 2 | 3 | 4 | 5 | 6,
      startTime: '09:00',
      endTime: '17:00',
    },
  ],
  createdAt: new Date(2024, 0, 1),
  updatedAt: new Date(),
}));

const departments = [
  'All Departments',
  'Internal Medicine',
  'Surgery',
  'Pediatrics',
  'Emergency',
  'Outpatient',
];

const specializations = [
  'All Specializations',
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
];

export default function Doctors() {
  const { toast } = useToast();
  const [doctors, setDoctors] = React.useState<Doctor[]>(mockDoctors);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [departmentFilter, setDepartmentFilter] = React.useState('All Departments');
  const [specializationFilter, setSpecializationFilter] = React.useState('All Specializations');
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // Filter doctors based on search term and filters
  const filteredDoctors = React.useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch = 
        doctor.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = 
        departmentFilter === 'All Departments' || doctor.department === departmentFilter;

      const matchesSpecialization = 
        specializationFilter === 'All Specializations' || doctor.specialization === specializationFilter;

      return matchesSearch && matchesDepartment && matchesSpecialization;
    });
  }, [doctors, searchTerm, departmentFilter, specializationFilter]);

  const handleCreateDoctor = async (data: any) => {
    try {
      // In a real app, this would call the API
      // await doctorApi.create(data);
      
      // For now, just simulate adding to the list
      const newDoctor: Doctor = {
        id: `d-${doctors.length + 1}`,
        userId: `Dr. ${data.firstName} ${data.lastName}`,
        specialization: data.specialization,
        department: data.department,
        licenseNumber: data.licenseNumber,
        education: data.education,
        experience: data.experience,
        availability: data.availability,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setDoctors([newDoctor, ...doctors]);
      setDialogOpen(false);
      
      toast({
        title: 'Success',
        description: 'Doctor added successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add doctor',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctors</h1>
          <p className="text-muted-foreground">Manage hospital staff and their schedules</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Add New Doctor</DialogTitle>
              <DialogDescription>
                Enter the doctor's information to create a new staff record.
              </DialogDescription>
            </DialogHeader>
            <DoctorForm onSubmit={handleCreateDoctor} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
                <TableHead>Doctor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>License No.</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage 
                          src={`https://randomuser.me/api/portraits/${doctor.userId.includes('Sarah') || doctor.userId.includes('Emily') || doctor.userId.includes('Lisa') ? 'women' : 'men'}/${parseInt(doctor.id.split('-')[1]) + 10}.jpg`} 
                          alt={doctor.userId} 
                        />
                        <AvatarFallback>{doctor.userId.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{doctor.userId}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span>{doctor.userId.toLowerCase().replace(' ', '.')}@hospital.com</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{doctor.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{doctor.specialization}</Badge>
                  </TableCell>
                  <TableCell>{doctor.experience} years</TableCell>
                  <TableCell>{doctor.licenseNumber}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {doctor.availability.map((slot, index) => (
                        <div key={index} className="text-sm">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][slot.dayOfWeek]}: {slot.startTime} - {slot.endTime}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>View Schedule</DropdownMenuItem>
                        <DropdownMenuItem>Manage Availability</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Deactivate Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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