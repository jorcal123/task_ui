import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Gestor de Tareas</h1>
          <TaskForm />
          <TaskFilter />
          <TaskList />
        </div>
        <Toaster position="bottom-right" />
      </div>
    </TaskProvider>
  );
};

export default App;