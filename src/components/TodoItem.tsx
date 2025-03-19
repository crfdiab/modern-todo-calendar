
import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Todo } from '@/lib/types';
import { useTodoStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodoStore();

  return (
    <div 
      className={cn(
        "group flex items-center justify-between p-4 rounded-lg animate-slide-up",
        "border border-border/50 hover:border-border transition-all duration-300",
        todo.completed ? "bg-secondary/40" : "bg-white",
      )}
    >
      <div className="flex items-center space-x-3 flex-1">
        <button
          onClick={() => toggleTodo(todo.id)}
          className={cn(
            "flex-shrink-0 w-5 h-5 rounded-full border border-muted-foreground/30",
            "flex items-center justify-center transition-colors duration-200",
            todo.completed ? "bg-primary border-primary" : "hover:border-primary"
          )}
        >
          {todo.completed && <Check className="h-3 w-3 text-primary-foreground" />}
        </button>
        
        <span 
          className={cn(
            "text-sm transition-all duration-200",
            todo.completed && "line-through text-muted-foreground"
          )}
        >
          {todo.text}
        </span>
      </div>
      
      <button
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity duration-200"
        aria-label="Delete task"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TodoItem;
