import React, { useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const { tasks, loading, fetchTasks } = useTaskContext();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) {
    return <div className="text-center py-4">Cargando tareas...</div>;
  }

  if (tasks.length === 0) {
    return <div className="text-center py-4">No hay tareas disponibles</div>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;