import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import {
  Activity,
  Calendar,
  ClipboardList,
  DollarSign,
  PieChart,
  Stethoscope,
  TestTube,
  Users,
} from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { RecentPatients } from '@/components/dashboard/recent-patients';
import { UpcomingAppointments } from '@/components/dashboard/upcoming-appointments';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { Patient, Appointment, DashboardStats } from '@/lib/types';
import { dashboardApi } from '@/lib/api';

// Mocked data for development
const mockStats: DashboardStats = {
  patientsCount: 1243,
  appointmentsToday: 56,
  pendingLabTests: 18,
  totalRevenue: 234800,
  // recentPatients: Array(5).fill(null).map((_, i) => ({
  //   id: `p-${i + 1}`,
  //   userId: `John Doe ${i + 1}`,
  //   dateOfBirth: new Date(1985, 3, 15),
  //   gender: i % 2 === 0 ? 'male' : 'female',
  //   address: '123 Main St, City',
  //   emergencyContact: {
  //     name: 'Jane Doe',
  //     relationship: 'Spouse',
  //     phone: '555-0123',
  //   },
  //   allergies: ['Penicillin'],
  //   medicalHistory: 'Hypertension, Diabetes',
  //   createdAt: new Date(new Date().setDate(new Date().getDate() - i)),
  //   updatedAt: new Date(new Date().setDate(new Date().getDate() - i)),
  // })),
  upcomingAppointments: Array(5).fill(null).map((_, i) => ({
    id: `a-${i + 1}`,
    patientId: `John Doe ${i + 1}`,
    doctorId: `Dr. Sarah Johnson`,
    date: new Date(new Date().setDate(new Date().getDate() + i)),
    startTime: '09:00',
    endTime: '09:30',
    status: i === 0 ? 'completed' : i === 4 ? 'cancelled' : 'scheduled',
    type: i % 2 === 0 ? 'check-up' : 'follow-up',
    reason: 'Regular check-up',
    notes: '',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 7)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 7)),
  })),
  monthlySummary: Array(12).fill(null).map((_, i) => {
    const month = format(new Date(2025, i, 1), 'MMM');
    return {
      month,
      patientsCount: 100 + Math.floor(Math.random() * 50),
      appointmentsCount: 150 + Math.floor(Math.random() * 100),
      revenue: 15000 + Math.floor(Math.random() * 10000),
    };
  }),
  recentPatients: []
};

export function Dashboard() {
  const { toast } = useToast();
  const [stats, setStats] = React.useState<DashboardStats>(mockStats);
  const [loading, setLoading] = React.useState(false);
  
  // In a real app, this would fetch data from the backend
  React.useEffect(() => {
    async function fetchDashboardStats() {
      try {
        setLoading(true);
        // Uncomment this in a real application connected to a backend
        // const data = await dashboardApi.getStats();
        // setStats(data);
        
        // For now, just simulate a loading delay
        setTimeout(() => {
          setStats(mockStats);
          setLoading(false);
        }, 1000);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive',
        });
        setLoading(false);
      }
    }
    
    fetchDashboardStats();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, Dr. John Smith. Here's an overview of your hospital.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Patients"
          value={stats.patientsCount.toLocaleString()}
          icon={<Users />}
          description="All registered patients"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Today's Appointments"
          value={stats.appointmentsToday}
          icon={<Calendar />}
          description="For today, June 15"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Pending Lab Tests"
          value={stats.pendingLabTests}
          icon={<TestTube />}
          description="Awaiting results"
          trend={{ value: 5, isPositive: false }}
        />
        <StatsCard
          title="Total Revenue"
          value={`$${(stats.totalRevenue / 1000).toFixed(1)}k`}
          icon={<DollarSign />}
          description="In this month"
          trend={{ value: 14, isPositive: true }}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <RevenueChart data={stats.monthlySummary} />
        </div>
        <div>
          <div className="grid gap-6 md:grid-cols-1">
            <StatsCard
              title="Doctors Available"
              value="12"
              icon={<Stethoscope />}
              description="Out of 15 doctors"
            />
            <StatsCard
              title="Surgeries Today"
              value="3"
              icon={<Activity />}
              description="2 completed, 1 scheduled"
            />
            <StatsCard
              title="Occupancy Rate"
              value="78%"
              icon={<PieChart />}
              description="32 out of 41 beds"
            />
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <RecentPatients patients={stats.recentPatients} />
        <UpcomingAppointments appointments={stats.upcomingAppointments} />
      </div>
    </div>
  );
}

export default Dashboard;