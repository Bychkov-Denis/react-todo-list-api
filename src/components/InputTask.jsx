import { Button, Flex, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  selectNewTaskTitle,
  setNewTaskTitle,
} from './../redux/tasksSlice';

const InputTask = () => {
  const dispatch = useDispatch();

  const newTaskTitle = useSelector(selectNewTaskTitle);

  const addNewTask = () => {
    dispatch(addTask(newTaskTitle));
  };

  const changeNewTaskTitle = event => {
    dispatch(setNewTaskTitle(event.target.value));
  };

  return (
    <Flex justify="space-between" align="center" gap="small">
      <Input
        value={newTaskTitle}
        placeholder="Введите название задачи..."
        onChange={changeNewTaskTitle}
        autoFocus
        onPressEnter={addNewTask}
      />
      <Button type="primary" onClick={addNewTask}>
        Добавить
      </Button>
    </Flex>
  );
};

export default InputTask;
