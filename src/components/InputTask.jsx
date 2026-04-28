import { Button, Flex, Input } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';

const InputTask = ({ setTasks }) => {
  const [title, setTitle] = useState('');

  const handleChangeTitle = event => {
    setTitle(event.target.value);
  };

  const addTask = () => {
    if (title.trim()) {
      setTasks(tasks => [
        ...tasks,
        { id: crypto.randomUUID(), title, isDone: false },
      ]);
      setTitle('');
      toast.success('Задача успешно добавлена');
    } else {
      toast.error('Название задачи не может быть пустым');
      return;
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
