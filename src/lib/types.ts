// Core type definitions for the Hospital Management System

export type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'pharmacist' | 'lab_technician' | 'patient';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient {
  id?: string;
  userId: string;
  title: 'Mr' | 'Mrs' | 'Ms' | 'Dr' | 'Master' | 'Miss' | 'Other';
  firstName: string;
  lastName: string;
  middleName?: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  age?: {
    years: number;
    months: number;
    days: number;
  };
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  citizenship?: string;
  religion?: string;
  caste?: string;
  occupation?: string;
  education?: string;
  annualIncome?: string;
  identifierType: 'ABHA' | 'Aadhar' | 'Passport' | 'Driving_License' | 'PAN';
  identifierNumber: string;

  // Address is expected as an array
  addresses: Array<{
    addressType: 'Present' | 'Permanent';
    houseNoOrFlatNo?: string;
    localityOrSector?: string;
    cityOrVillage?: string;
    districtId?: string;
    stateId?: string;
    country?: string;
    pincode?: string;
  }>;

  // ABHA details
  abhaDetails?: {
    abhaNumber?: string;
    abhaAddress?: string;
    verificationStatus?: string;
    verificationMethod?: string;
  };

  // Contact Info
  contacts: Array<{
    mobileNumber?: string;
    phoneNumber: string;
    email?: string;
    preferredContactMode?: 'Phone' | 'Email' | 'None';
    phoneContactPreference?: 'Call' | 'SMS' | 'WhatsApp';
    consentToShare: boolean;
  }>;

  // Emergency
  emergencyContacts: Array<{
    contactName: string;
    relationship: string;
    phoneNumber: string;
  }>;

  // Insurance
  insurance: {
    insuranceProvider: string;
    policyNumber: string;
    policyStartDate: string;
    policyEndDate: string;
    coverageAmount: number;
  };

  // Billing
  billing: {
    billingType: 'General' | 'Insurance' | 'Corporate' | 'Cash';
  };
  billingReferral: {
    referredBy?: string;
    billingType: string;
  };

  // Consent
  informationSharing: {
    shareWithSpouse: boolean;
    shareWithChildren: boolean;
    shareWithCaregiver: boolean;
    shareWithOther: boolean;
    shareWithOtherDetails?: string;
  };

  // Meta
  registrationDetails?: {
    registrationNumber: string;
  };

  createdAt?: string;
  updatedAt?: string;
}


export interface Doctor {
  id: string;
  userId: string;
  specialization: string;
  department: string;
  licenseNumber: string;
  education: string[];
  experience: number;
  availability: Availability[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Availability {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  startTime: string;
  endTime: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: 'check-up' | 'follow-up' | 'emergency' | 'procedure' | 'consultation';
  notes?: string;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId?: string;
  date: Date;
  diagnosis: string;
  symptoms: string[];
  treatment: string;
  prescription?: Prescription;
  labTests?: LabTest[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prescription {
  id: string;
  medicalRecordId: string;
  patientId: string;
  doctorId: string;
  date: Date;
  status: 'created' | 'dispensed' | 'cancelled';
  medicines: PrescriptionItem[];
  instructions: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrescriptionItem {
  medicineId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
}

export interface Medicine {
  id: string;
  name: string;
  description?: string;
  dosageForm: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'cream' | 'ointment' | 'other';
  strength: string;
  manufacturer: string;
  price: number;
  stockQuantity: number;
  expiryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LabTest {
  id: string;
  patientId: string;
  doctorId: string;
  medicalRecordId?: string;
  testName: string;
  testType: string;
  status: 'requested' | 'sample_collected' | 'processing' | 'completed' | 'cancelled';
  requestDate: Date;
  resultDate?: Date;
  results?: string;
  normalRange?: string;
  comments?: string;
  technicianId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bill {
  id: string;
  patientId: string;
  date: Date;
  items: BillItem[];
  totalAmount: number;
  discount?: number;
  taxAmount?: number;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod?: 'cash' | 'credit_card' | 'debit_card' | 'insurance' | 'online_transfer';
  paidAmount: number;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BillItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  type: 'consultation' | 'procedure' | 'laboratory' | 'medicine' | 'room' | 'other';
}

export interface DashboardStats {
  patientsCount: number;
  appointmentsToday: number;
  pendingLabTests: number;
  totalRevenue: number;
  recentPatients: Patient[];
  upcomingAppointments: Appointment[];
  monthlySummary: {
    month: string;
    patientsCount: number;
    appointmentsCount: number;
    revenue: number;
  }[];
}