import React from 'react';
import { format, parseISO, isToday, isTomorrow, isThisWeek, addMinutes } from 'date-fns';
import { Plus, Search, Filter, Calendar, Clock, MoreHorizontal } from 'lucide-react';
import { EventInput } from '@fullcalendar/core';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AppointmentForm } from '@/components/appointments/appointment-form';
import { CalendarView } from '@/components/appointments/calendar-view';
import { WaitingList } from '@/components/appointments/waiting-list';
import { Appointment } from '@/lib/types';
import { appointmentApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// Mock data for development
const appointmentTypes = ['check-up', 'follow-up', 'emergency', 'procedure', 'consultation'] as const;

const mockAppointments: Appointment[] = Array(10).fill(null).map((_, i) => ({
  id: `a-${i + 1}`,
  patientId: `Patient ${i + 1}`,
  doctorId: `Dr. ${['Sarah Johnson', 'Michael Smith', 'Emily Brown', 'David Wilson'][i % 4]}`,
  date: new Date(2025, 5, 15 + i),
  startTime: `${9 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`,
  endTime: `${9 + Math.floor(i / 2)}:${i % 2 === 0 ? '30' : '00'}`,
  status: ['scheduled', 'completed', 'cancelled', 'no-show'][i % 4] as 'scheduled' | 'completed' | 'cancelled' | 'no-show',
  type: appointmentTypes[i % appointmentTypes.length],
  reason: 'Regular check-up and consultation',
  notes: '',
  createdAt: new Date(),
  updatedAt: new Date(),
}));

// Mock waiting list data
const mockWaitingList = Array(5).fill(null).map((_, i) => ({
  id: `w-${i + 1}`,
  patientName: `Patient ${i + 1}`,
  patientId: `P${1000 + i}`,
  requestedTime: new Date(new Date().getTime() - (i * 30 * 60 * 1000)), // Subtract 30 minutes for each item
  priority: ['high', 'medium', 'low'][i % 3] as 'high' | 'medium' | 'low',
  reason: ['Fever and headache', 'Regular check-up', 'Follow-up', 'Emergency', 'Consultation'][i],
  status: ['waiting', 'called', 'waiting', 'waiting', 'cancelled'][i] as 'waiting' | 'called' | 'cancelled',
}));

export default function Appointments() {
  const { toast } = useToast();
  const [appointments, setAppointments] = React.useState<Appointment[]>(mockAppointments);
  const [waitingList, setWaitingList] = React.useState(mockWaitingList);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [dateFilter, setDateFilter] = React.useState('all');
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('list');

  // Convert appointments to calendar events
  const calendarEvents: EventInput[] = appointments.map((appointment) => {
    const startDate = new Date(appointment.date);
    const [hours, minutes] = appointment.startTime.split(':');
    startDate.setHours(parseInt(hours), parseInt(minutes));

    const endDate = new Date(startDate);
    const [endHours, endMinutes] = appointment.endTime.split(':');
    endDate.setHours(parseInt(endHours), parseInt(endMinutes));

    return {
      id: appointment.id,
      title: `${appointment.patientId} - ${appointment.type}`,
      start: startDate,
      end: endDate,
      extendedProps: {
        status: appointment.status,
        doctor: appointment.doctorId,
        type: appointment.type,
        reason: appointment.reason,
      },
    };
  });

  // Filter appointments based on search term, status, and date
  const filteredAppointments = React.useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch = 
        appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = 
        statusFilter === 'all' || appointment.status === statusFilter;

      const appointmentDate = new Date(appointment.date);
      const matchesDate = dateFilter === 'all' ||
        (dateFilter === 'today' && isToday(appointmentDate)) ||
        (dateFilter === 'tomorrow' && isTomorrow(appointmentDate)) ||
        (dateFilter === 'week' && isThisWeek(appointmentDate));

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [appointments, searchTerm, statusFilter, dateFilter]);

  const handleCreateAppointment = async (data: any) => {
    try {
      // In a real app, this would call the API
      // await appointmentApi.create(data);
      
      // For now, just simulate adding to the list
      const newAppointment: Appointment = {
        id: `a-${appointments.length + 1}`,
        patientId: data.patientId,
        doctorId: data.doctorId,
        date: data.date,
        startTime: data.startTime,
        endTime: data.startTime.split(':')[0] + ':30', // Simple 30-min slots
        status: 'scheduled',
        type: data.type,
        reason: data.reason,
        notes: data.notes || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setAppointments([newAppointment, ...appointments]);
      setDialogOpen(false);
      
      toast({
        title: 'Success',
        description: 'Appointment scheduled successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to schedule appointment',
        variant: 'destructive',
      });
    }
  };

  const handleWaitingListStatusChange = (id: string, status: 'waiting' | 'called' | 'cancelled') => {
    setWaitingList(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status } : item
      )
    );

    toast({
      title: 'Status Updated',
      description: `Patient ${status === 'called' ? 'has been called' : status}`,
    });
  };

  const handleWaitingListPriorityChange = (id: string, priority: 'high' | 'medium' | 'low') => {
    setWaitingList(prev => 
      prev.map(item => 
        item.id === id ? { ...item, priority } : item
      )
    );

    toast({
      title: 'Priority Updated',
      description: `Priority set to ${priority}`,
    });
  };

  function getStatusColor(status: string): string {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'no-show':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Schedule and manage patient appointments</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>
                Enter appointment details to schedule a new patient visit.
              </DialogDescription>
            </DialogHeader>
            <AppointmentForm onSubmit={handleCreateAppointment} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="waiting">Waiting List</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search appointments..."
                className="pl-8 w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="no-show">No Show</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="list" className="space-y-4">
          {loading ? (
            <div className="flex h-[400px] items-center justify-center">
              <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="h-12 px-4 text-left align-middle font-medium">Patient</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Doctor</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Date & Time</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Reason</th>
                    <th className="h-12 w-[50px] px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="font-medium">{appointment.patientId}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{appointment.doctorId}</div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foregroun" />
                            <span>{format(new Date(appointment.date), 'MMM dd, yyyy')}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>{appointment.startTime} - {appointment.endTime}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="capitalize">
                          {appointment.type.replace('-', ' ')}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="max-w-[300px] truncate" title={appointment.reason}>
                          {appointment.reason}
                        </div>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="calendar">
          <CalendarView
            events={calendarEvents}
            onEventClick={(info) => {
              toast({
                title: 'Appointment Details',
                description: `${info.event.title} - ${info.event.extendedProps.doctor}`,
              });
            }}
            onSelectSlot={(info) => {
              setDialogOpen(true);
            }}
          />
        </TabsContent>

        <TabsContent value="waiting">
          <WaitingList
            items={waitingList}
            onStatusChange={handleWaitingListStatusChange}
            onPriorityChange={handleWaitingListPriorityChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}