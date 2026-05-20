import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Flex,
  Input,
  Space,
  Typography,
  theme,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeIsTaskCompleted,
  selectEditingTaskId,
  selectEditingTaskTitle,
  setEditingTaskId,
  setEditingTaskTitle,
} from '../redux/tasksSlice';

const { Text } = Typography;

const TaskItem = ({ task, deleteTask }) => {
  const dispatch = useDispatch();

  const editingTaskId = useSelector(selectEditingTaskId);
  const editingTaskTitle = useSelector(selectEditingTaskTitle);

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const isTaskEditing = editingTaskId === task.id;

  const startTaskEditing = () => {
    dispatch(setEditingTaskId(task.id));
    dispatch(setEditingTaskTitle(task.title));
  };

  const stopTaskEditing = () => {
    dispatch(setEditingTaskId(null));
    dispatch(setEditingTaskTitle(''));
  };

  const handleChangeEditingTaskTitle = event => {
    dispatch(setEditingTaskTitle(event.target.value));
  };

  // const changeIsTaskEditing = () => {
  //   setIsTaskEditing(isTaskEditing => !isTaskEditing);
  // };

  // const cancelEditing = () => {
  //   setIsTaskEditing(false);
  // };

  // const handleSaveNewTaskText = () => {
  //   if (!newTaskTitle.trim()) {
  //     toast.error('Название задачи не может быть пустым');
  //     return;
  //   }

  //   saveNewTaskTitle(task.id, newTaskTitle);
  //   setIsTaskEditing(false);
  // };

  return !isTaskEditing ? (
    <Card
      style={{
        borderRadius: '8px',
        borderColor: colorPrimary,
      }}
      styles={{ body: { padding: '10px' } }}
    >
      <Flex align="center" justify="space-between" gap={12}>
        <Flex align="center" gap={12} flex={1}>
          <Checkbox
            checked={task.isCompleted}
            onChange={() => dispatch(changeIsTaskCompleted(task.id))}
          />
          <Text delete={task.isCompleted} style={{ flex: 1, margin: 0 }}>
            {task.title}
          </Text>
        </Flex>
        <Space size="middle">
          <EditOutlined
            style={{ fontSize: '18px', cursor: 'pointer' }}
            onClick={startTaskEditing}
          />
          <DeleteOutlined
            style={{ fontSize: '18px', cursor: 'pointer', color: '#ff4d4f' }}
            onClick={() => deleteTask(task.id)}
          />
        </Space>
      </Flex>
    </Card>
  ) : (
    <Flex align="center" gap="small">
      <Input
        value={editingTaskTitle}
        placeholder="Введите новое название задачи..."
        autoFocus
        onChange={handleChangeEditingTaskTitle}
        onPressEnter={null}
      />
      <Space>
        <Button type="primary" onClick={null}>
          Сохранить
        </Button>
        <Button type="primary" danger onClick={stopTaskEditing}>
          Отмена
        </Button>
      </Space>
    </Flex>
  );
};

export default TaskItem;
