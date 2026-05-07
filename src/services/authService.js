import axiosInstance from '../api/axiosInstance';
import { endpoints } from '../api/endpoints';

export const authService = {
  register: userData => {
    return axiosInstance.post(endpoints.auth.register, userData);
  },
  login: creditionals => {
    return axiosInstance.post(endpoints.auth.login, creditionals);
  },
};
