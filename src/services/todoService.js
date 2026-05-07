import axiosInstance from '../api/axiosInstance';
import { endpoints } from '../api/endpoints';

export const todoService = {
  getAll: () => {
    return axiosInstance.get(endpoints.todos.getAll);
  },
  create: todoData => {
    return axiosInstance.post(endpoints.todos.create, todoData);
  },
  updateTitle: (id, newTitle) => {
    return axiosInstance.patch(endpoints.todos.updateTitle(id), {
      title: newTitle,
    });
  },
  delete: id => {
    return axiosInstance.delete(endpoints.todos.delete(id));
  },
  updateIsCompleted: id => {
    return axiosInstance.patch(endpoints.todos.updateIsCompleted(id));
  },
};
