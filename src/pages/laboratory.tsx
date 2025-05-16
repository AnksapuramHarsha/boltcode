import React from 'react';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
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
import { LabTest } from '@/lib/types';
import { labTestApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { TestRequestForm } from '@/components/laboratory/test-request-form';

// Mock data for development
const mockLabTests: LabTest[] = Array(10).fill(null).map((_, i) => ({
  id: `lt-${i + 1}`,
  patientId: `Patient ${i + 1}`,
  doctorId: `Dr. ${['Sarah Johnson', 'Michael Smith', 'Emily Brown', 'David Wilson'][i % 4]}`,
  medicalRecordId: `mr-${i + 1}`,
  testName: ['Complete Blood Count', 'Lipid Profile', 'Liver Function Test', 'Kidney Function Test'][i % 4],
  testType: ['hematology', 'biochemistry', 'microbiology', 'pathology'][i % 4],
  status: ['requested', 'sample_collected', 'processing', 'completed'][i % 4] as 'requested' | 'sample_collected' | 'processing' | 'completed',
  requestDate: new Date(2024, 0, 1 + i),
  resultDate: i % 4 === 3 ? new Date(2024, 0, 2 + i) : undefined,
  results: i % 4 === 3 ? 'Normal results' : undefined,
  normalRange: '4.0-11.0',
  comments: i % 4 === 3 ? 'No abnormalities detected' : undefined,
  technicianId: i % 4 === 3 ? 'Tech-001' : undefined,
  createdAt: new Date(2024, 0, 1),
  updatedAt: new Date(),
}));

export default function Laboratory() {
  const { toast } = useToast();
  const [labTests, setLabTests] = React.useState<LabTest[]>(mockLabTests);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // Filter lab tests based on search term and status
  const filteredTests = React.useMemo(() => {
    return labTests.filter((test) => {
      const matchesSearch = 
        test.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.testName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = 
        statusFilter === 'all' || test.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [labTests, searchTerm, statusFilter]);

  const handleCreateTest = async (data: any) => {
    try {
      // In a real app, this would call the API
      // await labTestApi.create(data);
      
      // For now, just simulate adding to the list
      const newTest: LabTest = {
        id: `lt-${labTests.length + 1}`,
        patientId: data.patientId,
        doctorId: data.doctorId,
        testName: data.testName,
        testType: data.testType,
        status: 'requested',
        requestDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setLabTests([newTest, ...labTests]);
      setDialogOpen(false);
      
      toast({
        title: 'Success',
        description: 'Lab test requested successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to request lab test',
        variant: 'destructive',
      });
    }
  };

  function getStatusColor(status: string): string {
    switch (status) {
      case 'requested':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'sample_collected':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'processing':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Laboratory</h1>
          <p className="text-muted-foreground">Manage laboratory tests and results</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Test Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Request Laboratory Test</DialogTitle>
              <DialogDescription>
                Enter test details to create a new laboratory test request.
              </DialogDescription>
            </DialogHeader>
            <TestRequestForm onSubmit={handleCreateTest} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tests..."
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
            <SelectItem value="requested">Requested</SelectItem>
            <SelectItem value="sample_collected">Sample Collected</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
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
                <TableHead>Test Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Results</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>{test.patientId}</TableCell>
                  <TableCell>{test.testName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {test.testType}
                    </Badge>
                  </TableCell>
                  <TableCell>{test.doctorId}</TableCell>
                  <TableCell>
                    {test.requestDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(test.status)}>
                      {test.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {test.results ? (
                      <span className="text-sm">{test.results}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">Pending</span>
                    )}
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