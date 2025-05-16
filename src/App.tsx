import {ThemeProvider } from '@/lib/theme-provider';
import { Layout } from '@/components/layout/layout';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/dashboard';
import Appointments from '@/pages/appointments';
import Patients from '@/pages/patients';
import Vitals from '@/pages/vitals';
import Doctors from '@/pages/doctors';
import MedicalRecords from '@/pages/medical-records';
import Laboratory from '@/pages/laboratory';
import Prescriptions from '@/pages/prescriptions';
import Pharmacy from '@/pages/pharmacy';
import Billing from '@/pages/billing';
import Inventory from '@/pages/inventory';
import Reports from '@/pages/reports';
import Settings from '@/pages/settings';
import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="hms-theme">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/vitals" element={<Vitals />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/medical-records" element={<MedicalRecords />} />
            <Route path="/laboratory" element={<Laboratory />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;