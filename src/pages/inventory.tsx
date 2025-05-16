import React from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { InventoryForm } from '@/components/inventory/inventory-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Badge } from '@/components/ui/badge';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  unit: string;
  supplier: string;
  location: string;
  lastUpdated: Date;
}

// Mock data
const mockInventory: InventoryItem[] = Array(15).fill(null).map((_, i) => ({
  id: `inv-${i + 1}`,
  name: ['Surgical Masks', 'Gloves', 'Syringes', 'Bandages', 'Sanitizer'][i % 5],
  category: ['PPE', 'Medical Supplies', 'Equipment', 'Medicines'][i % 4],
  quantity: Math.floor(Math.random() * 1000),
  minQuantity: 100,
  unit: ['box', 'pack', 'piece', 'bottle'][i % 4],
  supplier: ['Medical Supplies Co.', 'Healthcare Products Ltd.', 'PharmaCare Inc.'][i % 3],
  location: ['Store Room A', 'Store Room B', 'Pharmacy Store'][i % 3],
  lastUpdated: new Date(Date.now() - Math.random() * 10000000000),
}));

const Inventory = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [inventory, setInventory] = React.useState<InventoryItem[]>(mockInventory);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [locationFilter, setLocationFilter] = React.useState('all');

  const filteredInventory = React.useMemo(() => {
    return inventory.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesLocation = locationFilter === 'all' || item.location === locationFilter;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [inventory, searchTerm, categoryFilter, locationFilter]);

  const handleCreateItem = async (data: any) => {
    const newItem: InventoryItem = {
      id: `inv-${inventory.length + 1}`,
      name: data.name,
      category: data.category,
      quantity: data.quantity,
      minQuantity: data.minQuantity,
      unit: data.unit,
      supplier: data.supplier,
      location: data.location,
      lastUpdated: new Date(),
    };

    setInventory([newItem, ...inventory]);
    setDialogOpen(false);
  };

  return (
    <ScrollArea className="h-[calc(100vh-10rem)]">
      <div className="space-y-6 px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
            <p className="text-muted-foreground">Manage hospital inventory and supplies</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogDescription>
                  Enter item details to add to inventory.
                </DialogDescription>
              </DialogHeader>
              <InventoryForm onSubmit={handleCreateItem} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="PPE">PPE</SelectItem>
              <SelectItem value="Medical Supplies">Medical Supplies</SelectItem>
              <SelectItem value="Equipment">Equipment</SelectItem>
              <SelectItem value="Medicines">Medicines</SelectItem>
            </SelectContent>
          </Select>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Store Room A">Store Room A</SelectItem>
              <SelectItem value="Store Room B">Store Room B</SelectItem>
              <SelectItem value="Pharmacy Store">Pharmacy Store</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.lastUpdated.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={item.quantity <= item.minQuantity ? "destructive" : "default"}
                    >
                      {item.quantity <= item.minQuantity ? "Low Stock" : "In Stock"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Inventory;