import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, AlertTriangle } from 'lucide-react';
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
import { Medicine } from '@/lib/types';
import { medicineApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { MedicineForm } from '@/components/pharmacy/medicine-form';

// Mock data for development
const mockMedicines: Medicine[] = Array(10).fill(null).map((_, i) => ({
  id: `m-${i + 1}`,
  name: ['Paracetamol', 'Amoxicillin', 'Omeprazole', 'Metformin'][i % 4],
  description: 'Generic medication description',
  dosageForm: (['tablet', 'capsule', 'liquid', 'injection'][i % 4] as Medicine['dosageForm']),
  strength: ['500mg', '250mg', '20mg', '850mg'][i % 4],
  manufacturer: ['Cipla', 'Sun Pharma', 'Dr. Reddy\'s', 'Lupin'][i % 4],
  price: 100 + (i * 10),
  stockQuantity: 100 - (i * 10),
  expiryDate: new Date(2025, i % 12, 1),
  createdAt: new Date(2024, 0, 1),
  updatedAt: new Date(),
}));

export default function Pharmacy() {
  const { toast } = useToast();
  const [medicines, setMedicines] = React.useState<Medicine[]>(mockMedicines);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [dosageFilter, setDosageFilter] = React.useState('all');
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // Filter medicines based on search term and dosage form
  const filteredMedicines = React.useMemo(() => {
    return medicines.filter((medicine) => {
      const matchesSearch = 
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDosage = 
        dosageFilter === 'all' || medicine.dosageForm === dosageFilter;

      return matchesSearch && matchesDosage;
    });
  }, [medicines, searchTerm, dosageFilter]);

  const handleCreateMedicine = async (data: Medicine) => {
    try {
      // In a real app, this would call the API
      // await medicineApi.create(data);
      
      // For now, just simulate adding to the list
      const newMedicine: Medicine = {
        id: `m-${medicines.length + 1}`,
        name: data.name,
        description: data.description,
        dosageForm: data.dosageForm,
        strength: data.strength,
        manufacturer: data.manufacturer,
        price: data.price,
        stockQuantity: data.stockQuantity,
        expiryDate: data.expiryDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setMedicines([newMedicine, ...medicines]);
      setDialogOpen(false);
      
      toast({
        title: 'Success',
        description: 'Medicine added successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add medicine',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pharmacy</h1>
          <p className="text-muted-foreground">Manage medication inventory and dispensing</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Add New Medicine</DialogTitle>
              <DialogDescription>
                Enter medicine details to add to inventory.
              </DialogDescription>
            </DialogHeader>
            <MedicineForm onSubmit={handleCreateMedicine} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search medicines..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={dosageFilter} onValueChange={setDosageFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by form" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Forms</SelectItem>
            <SelectItem value="tablet">Tablet</SelectItem>
            <SelectItem value="capsule">Capsule</SelectItem>
            <SelectItem value="liquid">Liquid</SelectItem>
            <SelectItem value="injection">Injection</SelectItem>
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
                <TableHead>Name</TableHead>
                <TableHead>Form</TableHead>
                <TableHead>Strength</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedicines.map((medicine) => (
                <TableRow key={medicine.id}>
                  <TableCell>{medicine.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {medicine.dosageForm}
                    </Badge>
                  </TableCell>
                  <TableCell>{medicine.strength}</TableCell>
                  <TableCell>{medicine.manufacturer}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{medicine.stockQuantity}</span>
                      {medicine.stockQuantity < 50 && (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>₹{medicine.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {medicine.expiryDate.toLocaleDateString()}
                      {medicine.expiryDate < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
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