export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/users/register',
  },
  todos: {
    getAll: '/todos',
    create: '/todos',
    updateTitle: id => `/todos/${id}`,
    delete: id => `/todos/${id}`,
    updateIsCompleted: id => `/todos/${id}/isCompleted`,
  },
};
