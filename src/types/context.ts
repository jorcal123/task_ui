import { Task } from '../types/task';

export interface TaskContextType {

    /**
     * Lista de tareas actuales de tipo`Task`.
     */
    tasks: Task[];
    /**
     * booleano que indica si hay una operación en curso.
     */
    loading: boolean;
    /**
     * Filtro para ver las tareas que han sido completadas o no.
     * - `'all'`: Muestra todas las tareas.
     * - `'completed'`: Muestra las tareas completadas.
     * - `'pending'`: Muestra las tareas pendientes.
     */
    filter: 'all' | 'completed' | 'pending';
  
  
    /**
     * Cambia el filtro de busqueda de las tareas.
     * @param filter - El nuevo filtro que se aplicará. puede ser `'all'`, `'completed'` o `'pending'`.
     */
    setFilter: (filter: 'all' | 'completed' | 'pending') => void;
  
    /**
     * Obtiene la lista de tareas desde la API.
     * @returns retorna una promesa si las tareas han sido cargadas.
     */
    fetchTasks: () => Promise<void>;
  
    /**
     * Metodo que crea una nueva tarea.
     * @param title - El título de la tarea.
     * @param description - (Opcional) Una descripción de la tarea.
     * @returns Una promesa si la tarea ha sido creada.
     */
    createTask: (title: string, description?: string) => Promise<void>;
  
    /**
     * Metodo que actualiza una tarea.
     * @param id - El identificador de la tarea que se va a actualizar.
     * @param updates - Objeto con la informacion que se va a actualizar de tipo `Task`.
     * @returns Una promesa si la tarea ha sido actualizada.
     */
    updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
    /**
     * metodo que elimina una tarea existente.
     * @param id - El identificador único de la tarea que se desea eliminar.
     * @returns Una promesa que resuelve cuando la tarea ha sido eliminada.
     */
    deleteTask: (id: string) => Promise<void>;
  }