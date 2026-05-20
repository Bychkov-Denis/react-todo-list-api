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

  useEffect(() => {
    const getAllTasks = () => {
      dispatch(getTasks());
    };
    getAllTasks();
  }, [dispatch]);

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
        <TaskFilter />
        <InputTask />
        <TaskList />
      </Container>
    </>
  );
}

export default TodoListPage;
