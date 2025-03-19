
import React from 'react';
import Header from '@/components/Header';
import Calendar from '@/components/Calendar';
import TodoList from '@/components/TodoList';
import AddTodo from '@/components/AddTodo';
import { useTodoStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const Index = () => {
  const { viewMode } = useTodoStore();
  
  return (
    <div className="min-h-screen flex flex-col px-4 py-8 md:px-8 md:py-12 space-y-8 overflow-x-hidden">
      <Header />
      
      <div className={cn(
        "flex flex-col md:flex-row gap-8 md:gap-16 w-full max-w-6xl mx-auto",
        "transition-all duration-500 ease-in-out"
      )}>
        <div className={cn(
          "w-full transition-all duration-500 ease-in-out",
          viewMode === 'month' ? 'md:w-1/2' : 'md:w-0 md:opacity-0 md:hidden'
        )}>
          {viewMode === 'month' && <Calendar />}
        </div>
        
        <div className={cn(
          "w-full transition-all duration-500 ease-in-out",
          viewMode === 'month' ? 'md:w-1/2' : 'w-full md:max-w-lg md:mx-auto'
        )}>
          <div className="space-y-6">
            <TodoList />
            <AddTodo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
