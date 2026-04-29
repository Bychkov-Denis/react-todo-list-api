import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './reset.css';

import { useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import Container from './components/Container';
import Header from './components/Header';
import InputTask from './components/InputTask';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');

  const deleteTask = id => {
    setTasks(tasks => tasks.filter(task => task.id !== id));
    toast.success('Задача успешно удалена');
  };

  const changeIsDone = id => {
    setTasks(tasks =>
      tasks.map(task => {
        if (task.id === id) {
          return { ...task, isDone: !task.isDone };
        } else {
          return task;
        }
      }),
    );
  };

  const saveNewTaskTitle = (id, newTitle) => {
    setTasks(tasks =>
      tasks.map(task => {
        if (task.id === id) {
          return { ...task, title: newTitle };
        } else {
          return task;
        }
      }),
    );
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.isDone);
      case 'completed':
        return tasks.filter(task => task.isDone);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <>
      <Container>
        <Header />
        <TaskFilter
          tasks={tasks}
          currentFilter={filter}
          onFilterChange={setFilter}
        />
        <InputTask setTasks={setTasks} />
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          changeIsDone={changeIsDone}
          saveNewTaskTitle={saveNewTaskTitle}
          currentFilter={filter}
        />
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
