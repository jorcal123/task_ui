import React, { useState } from 'react';
import { Task } from '../types/task';
import { useTaskContext } from '../context/TaskContext';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleToggleComplete = () => {
    updateTask(task._id, { completed: !task.completed });
  };

  const handleUpdate = async () => {
    if (title.trim() && title !== task.title) {
      await updateTask(task._id, { title });
    }
    setIsEditing(false);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
          />
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleUpdate}
              onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
              className="border rounded px-2 py-1"
              autoFocus
            />
          ) : (
            <span
              className={`${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}
              onClick={() => setIsEditing(true)}
            >
              {task.title}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {formatDate(task.createdAt)}
          </span>
          <button
            onClick={() => deleteTask(task._id)}
            className="text-red-600 hover:text-red-800 ml-2"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;