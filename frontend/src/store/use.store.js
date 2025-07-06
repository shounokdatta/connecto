import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningup: false,

  checkAuth: async () => {
    console.log("checkAuth is running")
    try {
      const res = await axiosInstance.get('/check');
      set({
        authUser: res.data.user,  // Assuming your backend sends a `user` object
      });
    } catch (err) {
      console.error('CheckAuth failed:', err.response?.data || err.message);
    }
  },

 SignUp: async (formData) => {
  set({ isSigningup: true });
  console.log(formData);
  try {
    const res = await axiosInstance.post('/signup', formData);
    

    set({
      authUser: res.data.name || res.data,
      email: res.data.email,
      password: res.data.password
    });
  } catch (err) {
    console.error('Signup failed:', err.response?.data || err.message);
  } finally {
    set({ isSigningup: false });
  }
}

}));
