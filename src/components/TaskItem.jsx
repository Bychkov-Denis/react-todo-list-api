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
import { useState } from 'react';
import { toast } from 'react-toastify';

const { Text } = Typography;

const TaskItem = ({
  task,
  deleteTask,
  changeIsCompleted,
  saveNewTaskTitle,
}) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [isTaskEditing, setIsTaskEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);

  const changeIsTaskEditing = () => {
    setIsTaskEditing(isTaskEditing => !isTaskEditing);
  };

  const cancelEditing = () => {
    setIsTaskEditing(false);
  };

  const HandlechangeNewTaskText = event => {
    setNewTaskTitle(event.target.value);
  };

  const handleSaveNewTaskText = () => {
    if (!newTaskTitle.trim()) {
      toast.error('Название задачи не может быть пустым');
      return;
    }

    saveNewTaskTitle(task.id, newTaskTitle);
    setIsTaskEditing(false);
  };

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
            onChange={() => changeIsCompleted(task.id)}
          />
          <Text delete={task.isCompleted} style={{ flex: 1, margin: 0 }}>
            {task.title}
          </Text>
        </Flex>
        <Space size="middle">
          <EditOutlined
            style={{ fontSize: '18px', cursor: 'pointer' }}
            onClick={changeIsTaskEditing}
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
        value={newTaskTitle}
        placeholder="Введите новое название задачи..."
        autoFocus
        onChange={HandlechangeNewTaskText}
        onPressEnter={handleSaveNewTaskText}
      />
      <Space>
        <Button type="primary" onClick={handleSaveNewTaskText}>
          Сохранить
        </Button>
        <Button type="primary" danger onClick={cancelEditing}>
          Отмена
        </Button>
      </Space>
    </Flex>
  );
};

export default TaskItem;
