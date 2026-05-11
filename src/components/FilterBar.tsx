import React from 'react';
import { useStore } from '../store';
import type { Priority } from '../types';

export function FilterBar() {
  const { todos, filters, setFilters } = useStore();

  const activeCount = todos.filter((todo) => !todo.completed).length;

  const handleStatusChange = (status: 'all' | 'active' | 'completed') => {
    setFilters({ status });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilters({ priority: value === 'all' ? null : (value as Priority) });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex gap-2">
        <button
          onClick={() => handleStatusChange('all')}
          className={`px-4 py-2 rounded-md ${
            filters.status === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleStatusChange('active')}
          className={`px-4 py-2 rounded-md flex items-center gap-2 ${
            filters.status === 'active'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Active
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              filters.status === 'active'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-400 text-white'
            }`}
          >
            {activeCount}
          </span>
        </button>
        <button
          onClick={() => handleStatusChange('completed')}
          className={`px-4 py-2 rounded-md ${
            filters.status === 'completed'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Completed
        </button>
      </div>

      <div className="flex gap-4 flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Search todos..."
          value={filters.search}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filters.priority || 'all'}
          onChange={handlePriorityChange}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>
    </div>
  );
}
