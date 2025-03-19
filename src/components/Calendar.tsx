
import React, { useEffect, useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  addMonths,
  subMonths,
  getDay,
  addDays 
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTodoStore } from '../lib/store';
import { cn } from '@/lib/utils';

const Calendar: React.FC = () => {
  const { selectedDate, setSelectedDate, todos } = useTodoStore();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selectedDate));
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  
  // Generate days for the current month view
  useEffect(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const startDay = getDay(monthStart);
    
    // Add days from the previous month to fill the first row
    const prevMonthDays = Array.from({ length: startDay }).map((_, i) => 
      addDays(monthStart, -startDay + i)
    );
    
    // Add days from the next month to complete the grid (always 6 rows = 42 days)
    const totalDaysNeeded = 42;
    const nextMonthDays = Array.from({ 
      length: Math.max(0, totalDaysNeeded - prevMonthDays.length - daysInMonth.length) 
    }).map((_, i) => 
      addDays(monthEnd, i + 1)
    );
    
    setCalendarDays([...prevMonthDays, ...daysInMonth, ...nextMonthDays]);
  }, [currentMonth]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const hasTasks = (date: Date) => {
    return todos.some(todo => 
      format(todo.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto animate-scale-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-1">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px mb-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px">
        {calendarDays.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, new Date());
          const isSelected = isSameDay(day, selectedDate);
          const hasTask = hasTasks(day);
          
          return (
            <button
              key={i}
              onClick={() => setSelectedDate(day)}
              className={cn(
                "calendar-day",
                !isCurrentMonth && "text-muted-foreground/40",
                isToday && !isSelected && "border border-primary/30",
                isSelected && "calendar-day-selected",
                isToday && isSelected && "calendar-day-current"
              )}
            >
              <span>{format(day, 'd')}</span>
              {hasTask && isCurrentMonth && (
                <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-primary/80"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
