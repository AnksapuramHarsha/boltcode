import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, DollarSign } from 'lucide-react';
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
import { Bill } from '@/lib/types';
import { billApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { BillingForm } from '@/components/billing/billing-form';

// Mock data for development
// Define payment methods as a tuple of string literals
const paymentMethods = ['cash', 'credit_card', 'debit_card', 'insurance'] as const;
const paymentStatuses = ['pending', 'partial', 'paid', 'overdue'] as const;

const mockBills: Bill[] = Array(10).fill(null).map((_, i) => ({
  id: `b-${i + 1}`,
  patientId: `Patient ${i + 1}`,
  date: new Date(2024, 0, 1 + i),
  items: [
    {
      description: 'Consultation',
      quantity: 1,
      unitPrice: 500,
      totalPrice: 500,
      type: 'consultation',
    },
    {
      description: 'Blood Test',
      quantity: 1,
      unitPrice: 1000,
      totalPrice: 1000,
      type: 'laboratory',
    },
  ],
  totalAmount: 1500,
  discount: i % 2 === 0 ? 100 : undefined,
  taxAmount: 150,
  paymentStatus: paymentStatuses[i % 4],
  paymentMethod: paymentMethods[i % paymentMethods.length],
  paidAmount: paymentStatuses[i % 4] === 'pending' || paymentStatuses[i % 4] === 'partial' ? 0 : 1500,
  dueDate: new Date(2024, 0, 15 + i),
  createdAt: new Date(2024, 0, 1),
  updatedAt: new Date(),
}));

export default function Billing() {
  const { toast } = useToast();
  const [bills, setBills] = React.useState<Bill[]>(mockBills);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // Filter bills based on search term and status
  const filteredBills = React.useMemo(() => {
    return bills.filter((bill) => {
      const matchesSearch = 
        bill.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = 
        statusFilter === 'all' || bill.paymentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bills, searchTerm, statusFilter]);

  const handleCreateBill = async (data: any) => {
    try {
      // In a real app, this would call the API
      // await billApi.create(data);
      
      // For now, just simulate adding to the list
      const newBill: Bill = {
        id: `b-${bills.length + 1}`,
        patientId: data.patientId,
        date: new Date(),
        items: data.items.map((item: any) => ({
          ...item,
          totalPrice: item.quantity * item.unitPrice,
        })),
        totalAmount: data.items.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice), 0),
        discount: data.discount,
        taxAmount: data.tax,
        paymentStatus: 'pending',
        paymentMethod: data.paymentMethod,
        paidAmount: 0,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setBills([newBill, ...bills]);
      setDialogOpen(false);
      
      toast({
        title: 'Success',
        description: 'Bill generated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate bill',
        variant: 'destructive',
      });
    }
  };

  function getStatusColor(status: string): string {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'partial':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">Manage patient billing and payments</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Bill
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Generate New Bill</DialogTitle>
              <DialogDescription>
                Create a new bill for the patient.
              </DialogDescription>
            </DialogHeader>
            <BillingForm onSubmit={handleCreateBill} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bills..."
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
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="partial">Partial</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
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
                <TableHead>Bill ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell>{bill.id}</TableCell>
                  <TableCell>{bill.patientId}</TableCell>
                  <TableCell>{bill.date.toLocaleDateString()}</TableCell>
                  <TableCell>₹{bill.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>₹{bill.paidAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(bill.paymentStatus)}>
                      {bill.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{bill.dueDate.toLocaleDateString()}</TableCell>
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