import React from 'react';
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
  onViewDetails: (patient: Patient) => void;
}

export function PatientList({
  patients,
  onEdit,
  onDelete,
  onViewDetails,
}: PatientListProps) {
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
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={`https://randomuser.me/api/portraits/${patient.gender.toLowerCase() === 'male' ? 'men' : 'women'}/${parseInt(patient.id.split('-')[1])}.jpg`}
                      alt={patient.userId}
                    />
                    <AvatarFallback>{patient.userId.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{patient.userId}</div>
                    <div className="text-sm text-muted-foreground">
                      {`${patient.addresses?.[0]?.houseNoOrFlatNo || ''}, ${patient.addresses?.[0]?.cityOrVillage || ''}`}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{patient.registrationDetails?.registrationNumber || '—'}</TableCell>
              {/* <TableCell>{patient.contactInformation?.phone || '—'}</TableCell> */}
              <TableCell>{patient.abhaDetails?.abhaNumber || '—'}</TableCell>
              <TableCell>
                <Badge variant="outline">{patient.billing?.billingType || '—'}</Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {patient?.emergencyContacts?.length ? (
                    patient.emergencyContacts.map((contact, index) => (
                      <div key={index} className="mb-2">
                        <div>{contact.contactName}</div>
                        <div className="text-muted-foreground">{contact.phoneNumber}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-muted-foreground">None</div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <PatientActions
                  patientId={patient.id}
                  onEdit={() => onEdit(patient)}
                  onDelete={() => onDelete(patient)}
                  onViewDetails={() => onViewDetails(patient)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
