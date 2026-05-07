import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import '../reset.css';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Container from '../components/Container';
import Header from '../components/Header';
import InputTask from '../components/InputTask';
import Loader from '../components/Loader.jsx';
import TaskFilter from '../components/TaskFilter';
import TaskList from '../components/TaskList';
import { todoService } from '../services/todoService';

function TodoListPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const deleteTask = useCallback(
    async id => {
      try {
        await todoService.delete(id);
        setTasks(tasks => tasks.filter(task => task.id !== id));
        toast.success('Задача успешно удалена');
      } catch ({ response }) {
        const errorMessage = response?.data?.message;
        toast.error(errorMessage);
      }
    },
    [setTasks],
  );

  const changeIsCompleted = useCallback(
    async id => {
      try {
        await todoService.updateIsCompleted(id);
        setTasks(tasks =>
          tasks.map(task =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
          ),
        );
        toast.success('Статус задачи успешно обновлён');
      } catch ({ response }) {
        const errorMessage = response?.data?.message;
        toast.error(errorMessage);
      }
    },
    [setTasks],
  );

  const saveNewTaskTitle = useCallback(
    async (id, newTitle) => {
      try {
        await todoService.updateTitle(id, newTitle);
        setTasks(tasks =>
          tasks.map(task => {
            if (task.id === id) {
              return { ...task, title: newTitle };
            } else {
              return task;
            }
          }),
        );
        toast.success('Заголовок задачи успешно обновлён');
      } catch ({ response }) {
        const errorMessage = response?.data?.message;
        toast.error(errorMessage);
      }
    },
    [setTasks],
  );

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.isCompleted);
      case 'completed':
        return tasks.filter(task => task.isCompleted);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        setIsLoading(true);
        const { data } = await todoService.getAll();
        setTasks(data);
        setIsLoading(false);
      } catch ({ response }) {
        setIsLoading(false);
        const errorMessage = response?.data?.message;
        toast.error(errorMessage);
      }
    };
    getAllTasks();
  }, []);

  const deleteCompletedTasks = async () => {
    const completedTasksId = tasks
      .filter(task => task.isCompleted)
      .map(task => task.id);

    if (!completedTasksId.length) {
      toast.error('Нет завершённых задач');
      return;
    }

    try {
      for (const taskId of completedTasksId) {
        await todoService.delete(taskId);
      }
      setTasks(tasks => tasks.filter(task => !task.isCompleted));
      toast.success(
        `Все завершённые задачи успешно удалены. Количество удалённых задач: ${completedTasksId.length}`,
      );
    } catch ({ response }) {
      const errorMessage = response?.data?.message;
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <>
      <Container>
        {isLoading && <Loader />}
        <Header />
        <TaskFilter
          tasks={tasks}
          currentFilter={filter}
          onFilterChange={setFilter}
          deleteCompletedTasks={deleteCompletedTasks}
        />
        <InputTask setTasks={setTasks} />
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          changeIsCompleted={changeIsCompleted}
          ыва
          фыва
          saveNewTaskTitle={saveNewTaskTitle}
          currentFilter={filter}
        />
      </Container>
    </>
  );
}

export default TodoListPage;
