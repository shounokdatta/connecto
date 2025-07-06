import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';


export const useAuthStore = create((set) => ({
  authUser: null,
  checkAuth: () => {
    // Example async call
    setTimeout(() => {
      set({ authUser: { name: 'Shounok Datta' } });
    }, 1000);
  },
}));