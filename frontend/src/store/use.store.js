import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';
import { io } from "socket.io-client";

const BASE_URL="https://connecto-pi.vercel.app/"

export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    console.log("checkAuth is running")
    try {
      const res = await axiosInstance.get('/auth/check');
      set({
        authUser: res.data.user,  // Assuming your backend sends a `user` object
      });
            console.log("Auth *User:", res.data.user);

            get().connectSocket()

    } catch (err) {
      console.error('CheckAuth failed:', err.response?.data || err.message);
    }
  },

 SignUp: async (formData) => {
  set({ isSigningup: true });
  console.log(formData);
  try {
    const res = await axiosInstance.post('/auth/signup', formData);
    

    set({ 
      Email: res.data.Email,
      fullName: res.data.Name,
      password: res.data.password,
        
    });
    toast.success('Account created successfully!');
  } catch (err) {
    console.error('Signup failed:', err.response?.data || err.message);
  } finally {
    set({ isSigningup: false });
  }
},

login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
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
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      console.log('Logged out successfully');
      toast.success('Logged out successfully');
      get().disconnectSocket();
    } catch (err) {
      console.error('Logout failed:', err?.response?.data || err.message);
      toast.error('Logout failed');
    }
  },
  
  updateProfile: async (profilepic) => {
    console.log("calling updateProfile");
  set({ isUpdatingProfile: true });

  try {
    await axiosInstance.post("/auth/updateProfile", profilepic); // Adjust endpoint if needed
    toast.success("Profile updated");
  } catch (err) {
    console.error("Profile update failed:", err?.response?.data || err.message);
    toast.error(err?.response?.data?.message || "Update failed");
  } finally {
    set({ isUpdatingProfile: false });
  }
},

 

connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
