import React from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskFilter: React.FC = () => {
  const { filter, setFilter } = useTaskContext();

  return (
    <div className="mb-6">
      <div className="flex gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${
            filter === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded ${
            filter === 'pending'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded ${
            filter === 'completed'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Completadas
        </button>
      </div>
    </div>
  );
};

export default TaskFilter;