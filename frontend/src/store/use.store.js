import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';


export const useAuthStore = create((set) => ({
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
  updateProfile: async (formData) => {
  set({ isUpdatingProfile: true });

  try {
    const res = await axiosInstance.put("/update-Profile", formData); // Adjust endpoint if needed
    set({ authUser: res.data.user }); // Assuming backend returns updated user
    toast.success("Profile updated");
  } catch (err) {
    console.error("Profile update failed:", err?.response?.data || err.message);
    toast.error(err?.response?.data?.message || "Update failed");
  } finally {
    set({ isUpdatingProfile: false });
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
