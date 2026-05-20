import { Badge, Button, Flex } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCompletedTasks,
  selectFilter,
  selectTasks,
  setFilter,
} from '../redux/tasksSlice';

const TaskFilter = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const filter = useSelector(selectFilter);

  const allCount = tasks.length;
  const activeCount = tasks.filter(task => !task.isCompleted).length;
  const completedCount = tasks.filter(task => task.isCompleted).length;

  const deleteCompletedTodos = () => {
    dispatch(deleteCompletedTasks());
  };

  return (
    <Flex gap="medium" style={{ justifyContent: 'center' }}>
      <Badge count={allCount} showZero color="blue">
        <Button
          type={filter === 'all' ? 'primary' : 'default'}
          onClick={() => dispatch(setFilter('all'))}
        >
          Все
        </Button>
      </Badge>
      <Badge count={activeCount} showZero color="orange">
        <Button
          type={filter === 'active' ? 'primary' : 'default'}
          onClick={() => dispatch(setFilter('active'))}
        >
          Активные
        </Button>
      </Badge>

      <Badge count={completedCount} showZero color="green">
        <Button
          type={filter === 'completed' ? 'primary' : 'default'}
          onClick={() => dispatch(setFilter('completed'))}
        >
          Завершённые
        </Button>
      </Badge>
      <Button color="cyan" variant="solid" onClick={deleteCompletedTodos}>
        Удалить завершённые задачи
      </Button>
    </Flex>
  );
};

export default TaskFilter;
