
export interface Todo {
  id: string;
  text: string;
  date: Date;
  completed: boolean;
  createdAt: Date;
}

export type ViewMode = 'day' | 'month';
