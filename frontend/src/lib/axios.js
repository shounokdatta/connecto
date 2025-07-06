import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
    withCredentials: true,
    headers: {
    'Content-Type': 'application/json',
  },
});