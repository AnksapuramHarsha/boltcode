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
  id: string;
  userId: string;
  title: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  status: 'active' | 'deceased';
  age: {
    years: number;
    months: number;
    days: number;
  };
  contactInformation: {
    email: string;
    phone: string;
    alternatePhone?: string;
    preferredContactMode: 'phone' | 'email' | 'sms' | 'whatsapp';
    preferredLanguage: 'english' | 'hindi' | 'khasi';
  };
  address: {
    houseNumber: string;
    flatNumber?: string;
    locality: string;
    sector?: string;
    line1: string;
    line2?: string;
    city: string;
    district: string;
    state: string;
    country: string;
    pinCode: string;
  };
  permanentAddress?: {
    houseNumber: string;
    flatNumber?: string;
    locality: string;
    sector?: string;
    line1: string;
    line2?: string;
    city: string;
    district: string;
    state: string;
    country: string;
    pinCode: string;
  };
  abhaDetails?: {
    abhaNumber: string;
    abhaAddress: string;
    verificationStatus: 'verified' | 'pending' | 'failed';
    verificationMethod?: string;
    verificationDate?: Date;
    verificationSource?: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    startDate: Date;
    endDate: Date;
    coverageAmount: number;
    status: 'active' | 'expired' | 'cancelled';
    documents?: Array<{
      type: string;
      url: string;
      uploadedAt: Date;
    }>;
  };
  emergencyContacts: Array<{
    relationshipType: string;
    name: string;
    phone: string;
    alternatePhone?: string;
    address?: string;
  }>;
  demographics: {
    citizenship: string;
    religion: string;
    caste?: string;
    occupation?: string;
    education?: string;
    annualIncome?: string;
    language: string[];
  };
  medicalInformation: {
    allergies: string[];
    chronicConditions: string[];
    currentMedications: string[];
    familyHistory: string[];
    lifestyle: {
      smoking: boolean;
      alcohol: boolean;
      exercise: string;
      diet: string;
    };
  };
  registrationDetails: {
    registeredBy: string;
    registrationType: 'walk-in' | 'referral' | 'emergency' | 'transfer' | 'online';
    registrationSource: string;
    registrationNumber: string;
    registrationDate: Date;
    registrationStatus: 'completed' | 'pending' | 'cancelled';
    verificationStatus: 'verified' | 'pending' | 'failed';
    documents: Array<{
      type: string;
      number: string;
      issuedBy: string;
      issuedDate: Date;
      validUntil?: Date;
      url: string;
    }>;
  };
  billing: {
    type: string;
    category: string;
    referredBy?: string;
    creditLimit?: number;
    defaultPaymentMethod?: string;
  };
  consent: {
    informationSharing: {
      spouse: boolean;
      children: boolean;
      caregiver: boolean;
      other: boolean;
      otherDetails?: string;
    };
    mobileSharing: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    marketingCommunications: boolean;
  };
  visits: Array<{
    id: string;
    date: Date;
    type: string;
    doctorId: string;
    doctorName: string;
    department: string;
    chiefComplaints: string[];
    diagnosis?: string;
    treatment?: string;
    followUp?: Date;
    status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  }>;
  vitalSigns: Array<{
    date: Date;
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    respiratoryRate: number;
    oxygenSaturation: number;
    weight: number;
    height: number;
    bmi: number;
    notes?: string;
    recordedBy: string;
  }>;
  documents: Array<{
    id: string;
    type: 'identification' | 'insurance' | 'medical' | 'prescription' | 'lab_report' | 'other';
    name: string;
    url: string;
    uploadedAt: Date;
    uploadedBy: string;
    category: string;
    tags: string[];
    description?: string;
    size: number;
    format: string;
  }>;
  auditTrail: Array<{
    action: string;
    performedBy: string;
    performedAt: Date;
    details: string;
    ipAddress: string;
    userAgent: string;
  }>;
  lastVisit?: Date;
  nextAppointment?: Date;
  createdAt: Date;
  updatedAt: Date;
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