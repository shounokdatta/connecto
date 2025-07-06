import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningup: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/check');
      set({ authUser: res.data.user });
    } catch (err) {
  console.error('Signup failed:', err.response?.data || err.message);
}
  },

  SignUp: async (formData) => {
    set({ isSigningup: true });
    try {
      const res = await axiosInstance.post('/auth/register', formData);
      console.log('Signup success:', res.data);
      set({ authUser: res.data.user || res.data });
    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);
    } finally {
      set({ isSigningup: false });
    }
  },
}));
