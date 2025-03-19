
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo, ViewMode } from './types';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface TodoState {
  todos: Todo[];
  selectedDate: Date;
  viewMode: ViewMode;
  addTodo: (text: string, date?: Date) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setSelectedDate: (date: Date) => void;
  setViewMode: (mode: ViewMode) => void;
  getTodosForDate: (date: Date) => Todo[];
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      selectedDate: new Date(),
      viewMode: 'month',

      addTodo: (text, date) => {
        const newTodo: Todo = {
          id: crypto.randomUUID(),
          text,
          date: date || get().selectedDate,
          completed: false,
          createdAt: new Date(),
        };
        
        set((state) => ({ todos: [newTodo, ...state.todos] }));
        toast.success('Task added');
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
        
        const todo = get().todos.find(t => t.id === id);
        if (todo) {
          todo.completed 
            ? toast.info('Task marked incomplete')
            : toast.success('Task completed');
        }
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
        
        toast.info('Task deleted');
      },

      setSelectedDate: (date) => {
        set({ selectedDate: date });
      },

      setViewMode: (mode) => {
        set({ viewMode: mode });
      },

      getTodosForDate: (date) => {
        return get().todos.filter((todo) => 
          format(todo.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        );
      },
    }),
    {
      name: 'todo-storage',
    }
  )
);
