import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core';
import { useTheme } from '@/lib/theme-provider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  events: EventInput[];
  onEventClick: (event: EventClickArg) => void;
  onSelectSlot: (selectInfo: DateSelectArg) => void;
}

export function CalendarView({ events, onEventClick, onSelectSlot }: CalendarViewProps) {
  const { theme } = useTheme();
  const [view, setView] = React.useState<'timeGridWeek' | 'dayGridMonth'>('timeGridWeek');

  const getEventColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'var(--chart-1)';
      case 'completed':
        return 'var(--chart-2)';
      case 'cancelled':
        return 'var(--chart-3)';
      case 'no-show':
        return 'var(--chart-4)';
      default:
        return 'var(--chart-5)';
    }
  };

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={view === 'timeGridWeek' ? 'default' : 'outline'}
            onClick={() => setView('timeGridWeek')}
            size="sm"
          >
            Week
          </Button>
          <Button
            variant={view === 'dayGridMonth' ? 'default' : 'outline'}
            onClick={() => setView('dayGridMonth')}
            size="sm"
          >
            Month
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-[var(--chart-1)] text-white">Scheduled</Badge>
            <Badge variant="outline" className="bg-[var(--chart-2)] text-white">Completed</Badge>
            <Badge variant="outline" className="bg-[var(--chart-3)] text-white">Cancelled</Badge>
            <Badge variant="outline" className="bg-[var(--chart-4)] text-white">No Show</Badge>
          </div>
        </div>
      </div>
    
    </Card>
  );
}