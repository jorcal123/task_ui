import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { Task } from '../types/task';
import toast from 'react-hot-toast';
import { TaskContextType } from '../types/context';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const API_URL = 'https://web-production-a09fb.up.railway.app/api';

//const API_URL = process.env.API_URL || 'http://localhost:3000/api'
//const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

fetch(`${API_URL}/tasks`)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));


export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`, {
        params: filter !== 'all' ? { completed: filter === 'completed' } : undefined
      });
      setTasks(response.data.data);
    } catch (error) {

        if (axios.isAxiosError(error)) {
        toast.error(`Error: ${error.message}`);
        } else {
        toast.error('Error al cargar las tareas');
    }    
    } finally {
      setLoading(false);
    }
  }, [filter]);

  const createTask = async (title: string, description?: string) => {
    try {
      await axios.post(`${API_URL}/tasks`, { title, description });
      toast.success('Tarea creada exitosamente');
      fetchTasks();
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(`Error: ${error.message}`);
            } else {
            toast.error('Error al crear la tarea');
        }        
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      await axios.put(`${API_URL}/tasks/${id}`, updates);
      toast.success('Tarea actualizada exitosamente');
      fetchTasks();
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(`Error: ${error.message}`);
            } else {
            toast.error('Error al actualizar la tarea');
        }       
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      toast.success('Tarea eliminada exitosamente');
      fetchTasks();
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(`Error: ${error.message}`);
            } else {
            toast.error('Error al eliminar la tarea');
        }   
    }
  };

  const value = {
    tasks,
    loading,
    filter,
    setFilter,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};