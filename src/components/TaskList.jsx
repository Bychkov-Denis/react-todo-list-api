import { Empty, Flex } from 'antd';
import { useSelector } from 'react-redux';
import { selectFilter, selectFilteredTasks } from '../redux/tasksSlice';
import TaskItem from './TaskItem';

const TaskList = ({ deleteTask, saveNewTaskTitle }) => {
  const filteredTasks = useSelector(selectFilteredTasks);
  const filter = useSelector(selectFilter);

  const message = {
    active: 'Нет активных задач',
    completed: 'Нет выполненных задач',
    all: 'Список задач пуст',
  };

  return (
    <>
      {filteredTasks.length === 0 && (
        <Empty
          description={message[filter] || message.all}
          style={{ marginTop: '50px' }}
        />
      )}
      <Flex vertical gap="small">
        {filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            saveNewTaskTitle={saveNewTaskTitle}
          />
        ))}
      </Flex>
    </>
  );
};

export default TaskList;
