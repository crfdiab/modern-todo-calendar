
import React from 'react';
import { format } from 'date-fns';
import { useTodoStore } from '../lib/store';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const { selectedDate, setViewMode, viewMode } = useTodoStore();

  return (
    <header className="animate-fade-in w-full py-8 flex flex-col items-center justify-center space-y-3">
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium text-muted-foreground">
          {format(selectedDate, 'EEEE')}
        </span>
        <h1 className="text-3xl font-light tracking-tight">
          {format(selectedDate, 'MMMM d, yyyy')}
        </h1>
      </div>
      
      <div className="flex space-x-1 bg-secondary rounded-full p-1">
        <button
          onClick={() => setViewMode('day')}
          className={cn(
            "px-4 py-1.5 text-sm rounded-full transition-all",
            viewMode === 'day' 
              ? "bg-white text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Day
        </button>
        <button
          onClick={() => setViewMode('month')}
          className={cn(
            "px-4 py-1.5 text-sm rounded-full transition-all",
            viewMode === 'month' 
              ? "bg-white text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Month
        </button>
      </div>
    </header>
  );
};

export default Header;
