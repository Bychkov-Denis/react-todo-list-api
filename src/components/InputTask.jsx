import { Button, Flex, Input } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { todoService } from '../services/todoService';

const InputTask = ({ setTasks }) => {
  const [title, setTitle] = useState('');

  const handleChangeTitle = event => {
    setTitle(event.target.value);
  };

  const addTask = async () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      toast.error('Название задачи не может быть пустым');
      return;
    }

    try {
      const { data } = await todoService.create({ title: trimmedTitle });
      setTasks(tasks => [...tasks, data]);
      setTitle('');
      toast.success('Задача успешно добавлена');
    } catch ({ response }) {
      const errorMessage = response?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <Flex justify="space-between" align="center" gap="small">
      <Input
        value={title}
        placeholder="Введите название задачи..."
        onChange={handleChangeTitle}
        autoFocus
        onPressEnter={addTask}
      />
      <Button type="primary" onClick={addTask}>
        Добавить
      </Button>
    </Flex>
  );
};

export default InputTask;
