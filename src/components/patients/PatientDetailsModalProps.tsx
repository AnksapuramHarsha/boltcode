// components/PatientDetailsModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PatientDetailsModalProps {
  patient: any; // Replace with a proper type when available
  isOpen: boolean;
  onClose: () => void;
}

export function PatientDetailsModal({ patient, isOpen, onClose }: PatientDetailsModalProps) {
  if (!patient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 text-sm p-2 sm:p-4">
          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>UHID:</strong> {patient.patientId}</p>
            <p><strong>Name:</strong> {patient.fullName}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>DOB:</strong> {patient.dateOfBirth}</p>
            <p><strong>Age:</strong> {patient.age ?? 'N/A'}</p>
            <p><strong>Phone:</strong> {patient.phone}</p>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>Marital Status:</strong> {patient.maritalStatus}</p>
            <p><strong>Occupation:</strong> {patient.occupation}</p>
            <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>
            <p><strong>Caste:</strong> {patient.caste}</p>
            <p><strong>Religion:</strong> {patient.religion}</p>
            <p><strong>Citizenship:</strong> {patient.citizenship}</p>
            <p><strong>Annual Income:</strong> {patient.annualIncome}</p>
            <p><strong>Education:</strong> {patient.education}</p>
            <p><strong>Identifier:</strong> {patient.identifierType} - {patient.identifierNumber}</p>
          </div>

          {/* Contact Info */}
          {patient.contacts?.length > 0 && (
            <div>
              <h4 className="font-semibold text-base mb-2">Contact Info</h4>
              <div className="grid gap-4">
                {patient.contacts.map((contact: any, index: number) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <p><strong>Mobile:</strong> {contact.mobileNumber}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Phone:</strong> {contact.phoneNumber}</p>
                    <p><strong>Preferred Mode:</strong> {contact.preferredContactMode}</p>
                    <p><strong>Contact Preference:</strong> {contact.phoneContactPreference}</p>
                    <p><strong>Consent to Share:</strong> {contact.consentToShare ? 'Yes' : 'No'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Addresses */}
          {patient.addresses?.length > 0 && (
            <div>
              <h4 className="font-semibold text-base mb-2">Addresses</h4>
              <div className="grid gap-4">
                {patient.addresses.map((addr: any, index: number) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <p><strong>Type:</strong> {addr.addressType}</p>
                    <p><strong>House No:</strong> {addr.houseNoOrFlatNo}</p>
                    <p><strong>Locality:</strong> {addr.localityOrSector}</p>
                    <p><strong>City:</strong> {addr.cityOrVillage}</p>
                    <p><strong>District:</strong> {addr.districtId}</p>
                    <p><strong>State:</strong> {addr.stateId}</p>
                    <p><strong>Country:</strong> {addr.country}</p>
                    <p><strong>Pincode:</strong> {addr.pincode}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Contacts */}
          {patient.emergencyContacts?.length > 0 && (
            <div>
              <h4 className="font-semibold text-base mb-2">Emergency Contacts</h4>
              <div className="grid gap-4">
                {patient.emergencyContacts.map((contact: any, index: number) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <p><strong>Name:</strong> {contact.contactName}</p>
                    <p><strong>Phone:</strong> {contact.phoneNumber}</p>
                    <p><strong>Relationship:</strong> {contact.relationship}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insurance */}
          {patient.insurance && (
            <div>
              <h4 className="font-semibold text-base mb-2">Insurance</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <p><strong>Provider:</strong> {patient.insurance.insuranceProvider}</p>
                <p><strong>Policy No:</strong> {patient.insurance.policyNumber}</p>
                <p><strong>Coverage:</strong> {patient.insurance.coverageAmount}</p>
                <p><strong>Valid From:</strong> {patient.insurance.policyStartDate}</p>
                <p><strong>Valid To:</strong> {patient.insurance.policyEndDate}</p>
              </div>
            </div>
          )}

          {/* Billing */}
          {patient.billingReferral && (
            <div>
              <h4 className="font-semibold text-base mb-2">Billing</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <p><strong>Type:</strong> {patient.billingReferral.billingType}</p>
                <p><strong>Referred By:</strong> {patient.billingReferral.referredBy}</p>
              </div>
            </div>
          )}

          {/* Tokens */}
          {patient.tokens?.length > 0 && (
            <div>
              <h4 className="font-semibold text-base mb-2">Tokens</h4>
              <div className="grid gap-4">
                {patient.tokens.map((token: any, index: number) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <p><strong>Number:</strong> {token.tokenNumber}</p>
                    <p><strong>Issued:</strong> {token.issueDate}</p>
                    <p><strong>Expires:</strong> {token.expiryDate}</p>
                    <p><strong>Status:</strong> {token.status}</p>
                    <p><strong>Allocated To:</strong> {token.allocatedTo}</p>
                    <p><strong>Registered:</strong> {token.isRegistered ? 'Yes' : 'No'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Information Sharing */}
          {patient.informationSharing && (
            <div>
              <h4 className="font-semibold text-base mb-2">Information Sharing</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <p><strong>Spouse:</strong> {patient.informationSharing.shareWithSpouse ? 'Yes' : 'No'}</p>
                <p><strong>Children:</strong> {patient.informationSharing.shareWithChildren ? 'Yes' : 'No'}</p>
                <p><strong>Other:</strong> {patient.informationSharing.shareWithOther ? 'Yes' : 'No'}</p>
                <p><strong>Caregiver:</strong> {patient.informationSharing.shareWithCaregiver ? 'Yes' : 'No'}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
