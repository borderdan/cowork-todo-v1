export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type Todo = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  assignee: string | null;
  createdAt: number;
};

export type FilterState = {
  status: 'all' | 'active' | 'completed';
  priority: Priority | null;
  search: string;
};
