import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useLocalStorage = (key, initialValue) => {
  const [storedTasks, setStoredTasks] = useState(() => {
    try {
      const tasks = localStorage.getItem(key);
      return tasks ? JSON.parse(tasks) : initialValue;
    } catch (error) {
      toast.error(error.message);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedTasks));
    } catch (error) {
      toast.error(error.message);
    }
  }, [key, storedTasks]);

  return [storedTasks, setStoredTasks];
};
