import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://connecto-bu6b.vercel.app/api/',
    withCredentials: true,
    headers: {
    'Content-Type': 'application/json',
  },
});