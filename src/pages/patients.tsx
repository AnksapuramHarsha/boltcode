import React, { useEffect } from "react";
import { Plus, Search, Pencil, Trash2, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { apiUrl } from "@/utils/api";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";
import { PatientDetailsModal } from "@/components/patients/PatientDetailsModalProps";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { PatientForm } from "@/components/patients/patient-form";
export default function Patients() {
  const { toast } = useToast();
  const [patients, setPatients] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [uhidFilter, setUhidFilter] = React.useState("");
  const [mobileFilter, setMobileFilter] = React.useState("");
  const [schemeFilter, setSchemeFilter] = React.useState("all");
  const [abhaFilter, setAbhaFilter] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingPatient, setEditingPatient] = React.useState<any | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedPatientId, setSelectedPatientId] = React.useState<null>(null);
  const [showPatientModal, setShowPatientModal] = React.useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl("/patients"));
      setPatients(response.data);
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleView = (patient: any) => {
    setSelectedPatientId(patient);
    setShowPatientModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedPatientId) return;
    try {
      await axios.delete(apiUrl(`/patients/${selectedPatientId}`));
      setPatients((prev) =>
        prev.filter((p) => p.patientId !== selectedPatientId)
      );
      toast({ title: "Deleted", description: "Patient deleted successfully" });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete patient",
        variant: "destructive",
      });
    } finally {
      setShowModal(false);
      setSelectedPatientId(null);
    }
  };

  const handleEdit = (patient: any) => {
    setEditingPatient(patient);
    setDialogOpen(true);
  };

  const handleFormSubmit = async (formData: any) => {
    console.log("formDataaaaaaaaaaa", formData);
    try {
      if (editingPatient) {
        const updated = await axios.put(
          apiUrl(`/patients/${editingPatient.patientId}`),
          { ...formData, facilityId: "9f24a48c-53d4-4fc2-8c96-2f3ff2a2c556" }
        );
        setPatients((prev) =>
          prev.map((p) =>
            p.patientId === editingPatient.patientId ? updated.data : p
          )
        );
        toast({
          title: "Updated",
          description: "Patient updated successfully",
        });
      } else {
        const created = await axios.post(apiUrl("/patients"), {
          ...formData,
          facilityId: "9f24a48c-53d4-4fc2-8c96-2f3ff2a2c556",
        });
        setPatients((prev) => [created.data, ...prev]);
        toast({
          title: "Created",
          description: "New patient added successfully",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save patient",
        variant: "destructive",
      });
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
        schemeFilter === "all" ||
        patient.insurance?.insuranceProvider === schemeFilter;

      const matchesABHA =
        !abhaFilter ||
        (patient.identifierNumber &&
          patient.identifierNumber.includes(abhaFilter));

      return (
        matchesSearch &&
        matchesUHID &&
        matchesMobile &&
        matchesScheme &&
        matchesABHA
      );
    });
  }, [
    patients,
    searchTerm,
    uhidFilter,
    mobileFilter,
    schemeFilter,
    abhaFilter,
  ]);

  return (
    <div className="space-y-10 px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Patients</h1>
          <p className="text-sm text-muted-foreground">
            Manage patient records and information
          </p>
        </div>
        <Dialog
          open={dialogOpen}
          onOpenChange={(val) => {
            if (!val) setEditingPatient(null);
            setDialogOpen(val);
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPatient(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-full max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPatient ? "Edit Patient" : "Register New Patient"}
              </DialogTitle>
              <DialogDescription>
                {editingPatient
                  ? "Update the patient details below."
                  : "Enter the patient's information."}
              </DialogDescription>
            </DialogHeader>
            <PatientForm
              onSubmit={handleFormSubmit}
              initialValues={editingPatient}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6 md:w-full">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Input
          placeholder="UHID"
          value={uhidFilter}
          onChange={(e) => setUhidFilter(e.target.value)}
        />
        <Input
          placeholder="Mobile Number"
          value={mobileFilter}
          onChange={(e) => setMobileFilter(e.target.value)}
        />
        <Input
          placeholder="Aadhar"
          value={abhaFilter}
          onChange={(e) => setAbhaFilter(e.target.value)}
        />
        <Select value={schemeFilter} onValueChange={setSchemeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Scheme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Schemes</SelectItem>
            <SelectItem value="National Insurance">
              National Insurance
            </SelectItem>
            <SelectItem value="Private">Private</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex h-[300px] items-center justify-center">
          <div className="animate-spin h-10 w-10 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="">
          {/* Desktop Table */}
          <div className="hidden md:block rounded-md border border-border shadow-sm overflow-hidden">
            <Table className="w-full text-sm table-auto">
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>UHID</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>PatientId</TableHead>
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
                          <AvatarImage
                            src={`https://randomuser.me/api/portraits/${
                              patient.gender?.toLowerCase() === "male"
                                ? "men"
                                : "women"
                            }/${Math.floor(Math.random() * 80)}.jpg`}
                            alt={patient.fullName}
                          />
                          <AvatarFallback>
                            {patient.firstName?.[0]}
                            {patient.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">
                            {patient.fullName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {patient.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">
                      UHID{patient.patientId?.slice(0, 8)}
                    </TableCell>
                    <TableCell className="text-xs">{patient.phone}</TableCell>
                    <TableCell className="text-xs">
                      {patient.identifierNumber}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        {patient.insurance?.insuranceProvider || "General"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">
                      {patient.emergencyContacts?.length > 0 ? (
                        <div>
                          <div>{patient.emergencyContacts[0].contactName}</div>
                          <div className="text-muted-foreground">
                            {patient.emergencyContacts[0].phoneNumber}
                          </div>
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="text-right flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(patient)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>

                      <Button
  variant="ghost"
  size="icon"
  onClick={() => {
    handleView(patient);
  }}
>
  <EyeIcon className="w-4 h-4 text-blue-500" />
</Button>


                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedPatientId(patient.patientId);
                          setShowModal(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="block md:hidden space-y-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.patientId}
                className="border rounded-md p-4 shadow-sm w-full"
              >
                <div className="flex items-start gap-4 mb-3">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarImage
                      src={`https://randomuser.me/api/portraits/${
                        patient.gender?.toLowerCase() === "male"
                          ? "men"
                          : "women"
                      }/${Math.floor(Math.random() * 80)}.jpg`}
                      alt={patient.fullName}
                    />
                    <AvatarFallback>
                      {patient.firstName?.[0]}
                      {patient.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-base">
                      {patient.fullName}
                    </div>
                    <div className="text-xs text-muted-foreground break-all">
                      {patient.email}
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div>
                    <strong>UHID:</strong> {patient.patientId?.slice(0, 8)}
                  </div>
                  <div>
                    <strong>Mobile:</strong> {patient.phone}
                  </div>
                  <div>
                    <strong>Identifier:</strong> {patient.identifierNumber}
                  </div>
                  <div>
                    <strong>Scheme:</strong>{" "}
                    {patient.insurance?.insuranceProvider || "General"}
                  </div>
                  <div>
                    <strong>Emergency:</strong>{" "}
                    {patient.emergencyContacts?.length > 0
                      ? `${patient.emergencyContacts[0].contactName} (${patient.emergencyContacts[0].phoneNumber})`
                      : "—"}
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(patient)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedPatientId(patient.patientId);
                      setShowModal(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <DeleteConfirmationModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setSelectedPatientId(null);
            }}
            onConfirm={confirmDelete}
          />
          <PatientDetailsModal
            isOpen={showPatientModal}
            onClose={() => {
              setShowPatientModal(false);
              setSelectedPatientId(null);
            }}
            patient={selectedPatientId}
          />
        </div>
      )}
    </div>
  );
}
