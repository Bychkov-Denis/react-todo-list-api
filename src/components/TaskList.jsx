import { Empty, Flex } from 'antd';
import TaskItem from './TaskItem';

const TaskList = ({
  tasks,
  deleteTask,
  changeIsDone,
  saveNewTaskTitle,
  currentFilter,
}) => {
  const message = {
    active: 'Нет активных задач',
    completed: 'Нет выполненных задач',
    all: 'Список задач пуст',
  };

  return tasks.length === 0 ? (
    <Empty
      description={message[currentFilter] || message.all}
      style={{ marginTop: '50px' }}
    />
  ) : (
    <Flex vertical gap="small">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          changeIsDone={changeIsDone}
          saveNewTaskTitle={saveNewTaskTitle}
        />
      ))}
    </Flex>
  );
};

export default TaskList;
