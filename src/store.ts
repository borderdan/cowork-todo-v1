import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Todo, FilterState } from './types';
import { genId } from './utils/id';

type StoreState = {
  todos: Todo[];
  filters: FilterState;
};

type StoreActions = {
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, todo: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  clearCompleted: () => void;
};

export const useStore = create<StoreState & StoreActions>()(
  persist(
    (set) => ({
      todos: [],
      filters: {
        status: 'all',
        priority: null,
        search: '',
      },
      addTodo: (todo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { ...todo, id: genId(), createdAt: Date.now() },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      updateTodo: (id, updatedTodo) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updatedTodo } : todo
          ),
        })),
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),
    }),
    {
      name: 'todo-storage',
    }
  )
);
