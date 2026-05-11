import { useEffect } from 'react';
import { FilterBar } from './components/FilterBar';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoItem } from './components/TodoItem';
import { useStore } from './store';

function App() {
  const { todos, filters, addTodo, toggleTodo, deleteTodo } = useStore();

  useEffect(() => {
    if (useStore.getState().todos.length === 0) {
      addTodo({ title: 'Welcome to Cowork Todo', description: 'Start collaborating with your team.', priority: 'medium', completed: false, assignee: null });
      addTodo({ title: 'Review PR #42', description: 'Check out the new feature.', priority: 'high', completed: false, assignee: 'Alice' });
      addTodo({ title: 'Schedule weekly sync', description: 'Find a time that works for everyone.', priority: 'low', completed: true, assignee: 'Bob' });
    }
  }, [addTodo]);

  const filteredTodos = todos.filter((todo) => {
    if (filters.status === 'active' && todo.completed) return false;
    if (filters.status === 'completed' && !todo.completed) return false;
    if (filters.priority && todo.priority !== filters.priority) return false;
    if (filters.search && !todo.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="p-4 bg-white dark:bg-gray-800 shadow-sm">
        <h1 className="text-2xl font-bold text-center">Cowork Todo</h1>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col gap-6">
        <FilterBar />

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <AddTodoForm />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={() => {}}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-10 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              No todos match your current filters.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
