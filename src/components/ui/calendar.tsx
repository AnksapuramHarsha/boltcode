import React, { useEffect, useRef, useState } from 'react';
import CalendarBase from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CalendarProps = {
  value: Date | null;
  onChange: (value: Date) => void;
  className?: string;
  closeOnSelect?: boolean;
};

export function Calendar({
  value,
  onChange,
  className,
  closeOnSelect = true,
}: CalendarProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close calendar if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (date: Date) => {
    onChange(date);
    if (closeOnSelect) setOpen(false);
  };

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        className={cn(
          'w-full flex items-center justify-between px-4 py-2 border rounded-md text-sm bg-white hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500',
          className
        )}
        onClick={() => setOpen(!open)}
      >
        {value ? format(value, 'PPP') : 'Select Date'}
        <CalendarIcon className="ml-2 h-4 w-4 opacity-60" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 rounded-md border bg-white p-2 shadow-lg">
          <CalendarBase
            onChange={handleChange}
            value={value}
            calendarType="gregory"
            className="!border-0"
            tileClassName={({ date, view }) =>
              view === 'month' ? 'text-sm p-1 rounded hover:bg-blue-100' : ''
            }
          />
        </div>
      )}
    </div>
  );
}
