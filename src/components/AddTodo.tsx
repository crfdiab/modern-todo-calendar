
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTodoStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const AddTodo: React.FC = () => {
  const { addTodo } = useTodoStore();
  const [text, setText] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "w-full max-w-lg mx-auto p-0.5 rounded-lg",
        "transition-all duration-300 animate-scale-in",
        isInputFocused 
          ? "bg-gradient-to-r from-primary/30 to-accent-foreground/30" 
          : "bg-secondary/80"
      )}
    >
      <div className="flex items-center bg-background rounded-md overflow-hidden">
        <button
          type="submit"
          disabled={!text.trim()}
          className={cn(
            "p-3 flex-shrink-0 text-muted-foreground transition-colors duration-200",
            text.trim() && "text-primary hover:text-primary/80"
          )}
        >
          <Plus className="h-5 w-5" />
        </button>
        
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 bg-transparent border-none outline-none text-foreground"
        />
      </div>
    </form>
  );
};

export default AddTodo;
