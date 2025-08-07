import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://connecto-pi.vercel.app/api/',
    withCredentials: true,
    headers: {
    'Content-Type': 'application/json',
  },
});