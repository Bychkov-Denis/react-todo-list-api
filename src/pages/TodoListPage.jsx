import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import '../reset.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../components/Container';
import Header from '../components/Header';
import InputTask from '../components/InputTask';
import Loader from '../components/Loader.jsx';
import TaskFilter from '../components/TaskFilter';
import TaskList from '../components/TaskList';
import { getTasks, selectLoading } from './../redux/tasksSlice';

function TodoListPage() {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);

  // const deleteTask = useCallback(
  //   async id => {
  //     try {
  //       await todoService.delete(id);
  //       setTasks(tasks => tasks.filter(task => task.id !== id));
  //       toast.success('Задача успешно удалена');
  //     } catch ({ response }) {
  //       const errorMessage = response?.data?.message;
  //       toast.error(errorMessage);
  //     }
  //   },
  //   [setTasks],
  // );

  // const changeIsCompleted = useCallback(
  //   async id => {
  //     try {
  //       await todoService.updateIsCompleted(id);
  //       setTasks(tasks =>
  //         tasks.map(task =>
  //           task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
  //         ),
  //       );
  //       toast.success('Статус задачи успешно обновлён');
  //     } catch ({ response }) {
  //       const errorMessage = response?.data?.message;
  //       toast.error(errorMessage);
  //     }
  //   },
  //   [setTasks],
  // );

  // const saveNewTaskTitle = useCallback(
  //   async (id, newTitle) => {
  //     try {
  //       await todoService.updateTitle(id, newTitle);
  //       setTasks(tasks =>
  //         tasks.map(task => {
  //           if (task.id === id) {
  //             return { ...task, title: newTitle };
  //           } else {
  //             return task;
  //           }
  //         }),
  //       );
  //       toast.success('Заголовок задачи успешно обновлён');
  //     } catch ({ response }) {
  //       const errorMessage = response?.data?.message;
  //       toast.error(errorMessage);
  //     }
  //   },
  //   [setTasks],
  // );

  useEffect(() => {
    const getAllTasks = () => {
      dispatch(getTasks());
    };
    getAllTasks();
  }, [dispatch]);

  // const deleteCompletedTasks = async () => {
  //   const completedTasksId = tasks
  //     .filter(task => task.isCompleted)
  //     .map(task => task.id);

  //   if (!completedTasksId.length) {
  //     toast.error('Нет завершённых задач');
  //     return;
  //   }

  //   try {
  //     for (const taskId of completedTasksId) {
  //       await todoService.delete(taskId);
  //     }
  //     setTasks(tasks => tasks.filter(task => !task.isCompleted));
  //     toast.success(
  //       `Все завершённые задачи успешно удалены. Количество удалённых задач: ${completedTasksId.length}`,
  //     );
  //   } catch ({ response }) {
  //     const errorMessage = response?.data?.message;
  //     toast.error(errorMessage);
  //   }
  // };

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <>
      <Container>
        {loading && <Loader />}
        <Header />
        <TaskFilter
        // deleteCompletedTasks={deleteCompletedTasks}
        />
        <InputTask />
        <TaskList
        // deleteTask={deleteTask}
        // changeIsCompleted={changeIsCompleted}
        // saveNewTaskTitle={saveNewTaskTitle}
        />
      </Container>
    </>
  );
}

export default TodoListPage;
