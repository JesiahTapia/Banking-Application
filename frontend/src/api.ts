import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const login = async (username: string, password: string) => {
  const response = await api.post('/login', { username, password });
  return response.data;
};

export const getAccount = async (userId: number) => {
  const response = await api.get(`/account/${userId}`);
  return response.data;
};
