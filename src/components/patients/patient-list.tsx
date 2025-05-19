import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PatientActions } from './patient-actions';
import { Patient } from '@/lib/types';

interface PatientListProps {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
  onViewDetails?: (patient: Patient) => void;
}

export function PatientList({
  patients,
  onEdit,
  onDelete,
  onViewDetails,
}: PatientListProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
    onViewDetails?.(patient);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>UHID</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>ABHA Number</TableHead>
            <TableHead>Scheme</TableHead>
            <TableHead>Emergency Contact</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <div
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                  onClick={() => openModal(patient)}
                >
                  <Avatar>
                    <AvatarImage
                      src={`https://randomuser.me/api/portraits/${patient.gender === 'male' ? 'men' : 'women'}/${parseInt(patient.id.split('-')[1])}.jpg`}
                      alt={patient.userId}
                    />
                    <AvatarFallback>{patient.userId.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{patient.userId}</div>
                    <div className="text-sm text-gray-500">
                      {`${patient?.address.houseNumber}, ${patient?.address.city}`}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{patient.registrationDetails.registrationNumber}</TableCell>
              <TableCell>{patient.contactInformation.phone}</TableCell>
              <TableCell>{patient?.abhaDetails?.abhaNumber}</TableCell>
              <TableCell>
                <Badge variant="outline">{patient.billing.type}</Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {patient?.emergencyContacts?.map((contact, index) => (
                    <div key={index} className="mb-2">
                      <div>{contact.name}</div>
                      <div className="text-gray-500">{contact.phone}</div>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <PatientActions
                  patientId={patient.id}
                  onEdit={() => onEdit(patient)}
                  onDelete={() => onDelete(patient)}
                  onViewDetails={() => openModal(patient)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Custom Modal */}
      {isModalOpen && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Patient Details</h2>
            <div className="space-y-2">
              <p><strong>UHID:</strong> {selectedPatient.registrationDetails.registrationNumber}</p>
              <p><strong>Name:</strong> {selectedPatient.userId}</p>
              <p><strong>Phone:</strong> {selectedPatient.contactInformation.phone}</p>
              <p><strong>Address:</strong> {selectedPatient.address.houseNumber}, {selectedPatient.address.city}</p>
              <p><strong>ABHA Number:</strong> {selectedPatient.abhaDetails?.abhaNumber}</p>
              <p><strong>Scheme:</strong> {selectedPatient.billing.type}</p>
              <div>
                <strong>Emergency Contacts:</strong>
                <ul className="list-disc ml-6">
                  {selectedPatient.emergencyContacts?.map((contact, index) => (
                    <li key={index}>
                      {contact.name} - {contact.phone}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
