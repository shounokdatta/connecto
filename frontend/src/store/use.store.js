import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';


export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningup: false,
  isLoggingIn: false,

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
      Email: res.data.Email,
      fullName: res.data.Name,
      password: res.data.password,
        
    });
  } catch (err) {
    console.error('Signup failed:', err.response?.data || err.message);
  } finally {
    set({ isSigningup: false });
  }
},

login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
  toast.error(error?.response?.data?.message || error.message || "Login failed");
  } finally {
    set({ isLoggingIn: false });
  }
  },
 logout: async () => {
    try {
      await axiosInstance.post('/logout');
      set({ authUser: null });
      toast.success('Logged out successfully');
    } catch (err) {
      console.error('Logout failed:', err?.response?.data || err.message);
      toast.error('Logout failed');
    }
  }


}));
