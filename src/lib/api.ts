// API service for making requests to the backend
// In a real production environment, this would connect to a Quarkus backend

import { 
  User, 
  Patient, 
  Doctor, 
  Appointment, 
  MedicalRecord, 
  Prescription, 
  Medicine, 
  LabTest, 
  Bill, 
  DashboardStats 
} from './types';

// Base URL for API requests - would point to Quarkus backend in production
const API_BASE_URL = '/api';

// Helper function for making API requests
async function fetchApi<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
  };

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API request failed with status ${response.status}`);
  }
  
  return response.json();
}

// Authentication API
export const authApi = {
  login: (email: string, password: string) => 
    fetchApi<{ token: string; user: User }>('/auth/login', 'POST', { email, password }),
  
  logout: () => 
    fetchApi<void>('/auth/logout', 'POST'),
  
  getCurrentUser: () => 
    fetchApi<User>('/auth/me'),
};

// Patients API
export const patientApi = {
  getAll: (page = 1, limit = 10, search?: string) => 
    fetchApi<{ data: Patient[]; total: number }>(`/patients?page=${page}&limit=${limit}${search ? `&search=${search}` : ''}`),
  
  getById: (id: string) => 
    fetchApi<Patient>(`/patients/${id}`),
  
  create: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => 
    fetchApi<Patient>('/patients', 'POST', patient),
  
  update: (id: string, patient: Partial<Patient>) => 
    fetchApi<Patient>(`/patients/${id}`, 'PUT', patient),
  
  delete: (id: string) => 
    fetchApi<void>(`/patients/${id}`, 'DELETE'),
};

// Doctors API
export const doctorApi = {
  getAll: (page = 1, limit = 10, department?: string) => 
    fetchApi<{ data: Doctor[]; total: number }>(`/doctors?page=${page}&limit=${limit}${department ? `&department=${department}` : ''}`),
  
  getById: (id: string) => 
    fetchApi<Doctor>(`/doctors/${id}`),
  
  create: (doctor: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>) => 
    fetchApi<Doctor>('/doctors', 'POST', doctor),
  
  update: (id: string, doctor: Partial<Doctor>) => 
    fetchApi<Doctor>(`/doctors/${id}`, 'PUT', doctor),
  
  delete: (id: string) => 
    fetchApi<void>(`/doctors/${id}`, 'DELETE'),
  
  getAvailability: (id: string, date: string) => 
    fetchApi<{ timeSlots: { startTime: string; endTime: string }[] }>(`/doctors/${id}/availability?date=${date}`),
};

// Appointments API
export const appointmentApi = {
  getAll: (page = 1, limit = 10, status?: string) => 
    fetchApi<{ data: Appointment[]; total: number }>(`/appointments?page=${page}&limit=${limit}${status ? `&status=${status}` : ''}`),
  
  getById: (id: string) => 
    fetchApi<Appointment>(`/appointments/${id}`),
  
  create: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => 
    fetchApi<Appointment>('/appointments', 'POST', appointment),
  
  update: (id: string, appointment: Partial<Appointment>) => 
    fetchApi<Appointment>(`/appointments/${id}`, 'PUT', appointment),
  
  cancel: (id: string, reason: string) => 
    fetchApi<Appointment>(`/appointments/${id}/cancel`, 'POST', { reason }),
  
  getByPatient: (patientId: string) => 
    fetchApi<Appointment[]>(`/patients/${patientId}/appointments`),
  
  getByDoctor: (doctorId: string, date?: string) => 
    fetchApi<Appointment[]>(`/doctors/${doctorId}/appointments${date ? `?date=${date}` : ''}`),
};

// Medical Records API
export const medicalRecordApi = {
  getByPatient: (patientId: string) => 
    fetchApi<MedicalRecord[]>(`/patients/${patientId}/medical-records`),
  
  getById: (id: string) => 
    fetchApi<MedicalRecord>(`/medical-records/${id}`),
  
  create: (record: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>) => 
    fetchApi<MedicalRecord>('/medical-records', 'POST', record),
  
  update: (id: string, record: Partial<MedicalRecord>) => 
    fetchApi<MedicalRecord>(`/medical-records/${id}`, 'PUT', record),
};

// Prescriptions API
export const prescriptionApi = {
  getByPatient: (patientId: string) => 
    fetchApi<Prescription[]>(`/patients/${patientId}/prescriptions`),
  
  getById: (id: string) => 
    fetchApi<Prescription>(`/prescriptions/${id}`),
  
  create: (prescription: Omit<Prescription, 'id' | 'createdAt' | 'updatedAt'>) => 
    fetchApi<Prescription>('/prescriptions', 'POST', prescription),
  
  update: (id: string, prescription: Partial<Prescription>) => 
    fetchApi<Prescription>(`/prescriptions/${id}`, 'PUT', prescription),
  
  dispense: (id: string) => 
    fetchApi<Prescription>(`/prescriptions/${id}/dispense`, 'POST'),
};

// Medicines API
export const medicineApi = {
  getAll: (page = 1, limit = 10, search?: string) => 
    fetchApi<{ data: Medicine[]; total: number }>(`/medicines?page=${page}&limit=${limit}${search ? `&search=${search}` : ''}`),
  
  getById: (id: string) => 
    fetchApi<Medicine>(`/medicines/${id}`),
  
  create: (medicine: Omit<Medicine, 'id' | 'createdAt' | 'updatedAt'>) => 
    fetchApi<Medicine>('/medicines', 'POST', medicine),
  
  update: (id: string, medicine: Partial<Medicine>) => 
    fetchApi<Medicine>(`/medicines/${id}`, 'PUT', medicine),
  
  delete: (id: string) => 
    fetchApi<void>(`/medicines/${id}`, 'DELETE'),
  
  updateStock: (id: string, quantity: number) => 
    fetchApi<Medicine>(`/medicines/${id}/stock`, 'PUT', { quantity }),
};

// Lab Tests API
export const labTestApi = {
  getAll: (page = 1, limit = 10, status?: string) => 
    fetchApi<{ data: LabTest[]; total: number }>(`/lab-tests?page=${page}&limit=${limit}${status ? `&status=${status}` : ''}`),
  
  getById: (id: string) => 
    fetchApi<LabTest>(`/lab-tests/${id}`),
  
  create: (test: Omit<LabTest, 'id' | 'createdAt' | 'updatedAt'>) => 
    fetchApi<LabTest>('/lab-tests', 'POST', test),
  
  update: (id: string, test: Partial<LabTest>) => 
    fetchApi<LabTest>(`/lab-tests/${id}`, 'PUT', test),
  
  updateStatus: (id: string, status: LabTest['status']) => 
    fetchApi<LabTest>(`/lab-tests/${id}/status`, 'PUT', { status }),
  
  addResult: (id: string, results: string, normalRange?: string, comments?: string) => 
    fetchApi<LabTest>(`/lab-tests/${id}/results`, 'POST', { results, normalRange, comments }),
  
  getByPatient: (patientId: string) => 
    fetchApi<LabTest[]>(`/patients/${patientId}/lab-tests`),
};

// Billing API
export const billApi = {
  getAll: (page = 1, limit = 10, status?: string) => 
    fetchApi<{ data: Bill[]; total: number }>(`/bills?page=${page}&limit=${limit}${status ? `&status=${status}` : ''}`),
  
  getById: (id: string) => 
    fetchApi<Bill>(`/bills/${id}`),
  
  create: (bill: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>) => 
    fetchApi<Bill>('/bills', 'POST', bill),
  
  update: (id: string, bill: Partial<Bill>) => 
    fetchApi<Bill>(`/bills/${id}`, 'PUT', bill),
  
  recordPayment: (id: string, amount: number, method: Bill['paymentMethod']) => 
    fetchApi<Bill>(`/bills/${id}/payments`, 'POST', { amount, method }),
  
  getByPatient: (patientId: string) => 
    fetchApi<Bill[]>(`/patients/${patientId}/bills`),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => 
    fetchApi<DashboardStats>('/dashboard/stats'),
};