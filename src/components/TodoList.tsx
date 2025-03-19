
import React from 'react';
import { useTodoStore } from '@/lib/store';
import { format } from 'date-fns';
import TodoItem from './TodoItem';
import { ListChecks } from 'lucide-react';

const TodoList: React.FC = () => {
  const { selectedDate, getTodosForDate } = useTodoStore();
  const todos = getTodosForDate(selectedDate);

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium flex items-center gap-2">
          <span className="inline-flex items-center justify-center p-1 bg-primary/10 rounded-full">
            <ListChecks className="h-4 w-4 text-primary" />
          </span>
          {format(selectedDate, 'MMMM d')} Tasks
        </h2>
        <span className="text-sm text-muted-foreground">
          {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      <div className="space-y-2">
        {todos.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No tasks for this day</p>
            <p className="text-sm text-muted-foreground/60">Add a task to get started</p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
