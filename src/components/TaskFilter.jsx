import { Badge, Button, Flex } from 'antd';

const TaskFilter = ({
  tasks = [],
  currentFilter,
  onFilterChange,
  deleteCompletedTasks,
}) => {
  const allCount = tasks.length;
  const activeCount = tasks.filter(task => !task.isCompleted).length;
  const completedCount = tasks.filter(task => task.isCompleted).length;

  return (
    <Flex gap="medium" style={{ justifyContent: 'center' }}>
      <Badge count={allCount} showZero color="blue">
        <Button
          type={currentFilter === 'all' ? 'primary' : 'default'}
          onClick={() => onFilterChange('all')}
        >
          Все
        </Button>
      </Badge>
      <Badge count={activeCount} showZero color="orange">
        <Button
          type={currentFilter === 'active' ? 'primary' : 'default'}
          onClick={() => onFilterChange('active')}
        >
          Активные
        </Button>
      </Badge>

      <Badge count={completedCount} showZero color="green">
        <Button
          type={currentFilter === 'completed' ? 'primary' : 'default'}
          onClick={() => onFilterChange('completed')}
        >
          Завершённые
        </Button>
      </Badge>
      <Button color="cyan" variant="solid" onClick={deleteCompletedTasks}>
        Удалить завершённые задачи
      </Button>
    </Flex>
  );
};

export default TaskFilter;
