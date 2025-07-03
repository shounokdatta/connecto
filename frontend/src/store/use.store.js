import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';

export const useAuthStore =create((set)=>({



    authUser:null,
    isSigngUp: false,
    isLoggedIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    chekeAuth:async()=>{
        try{
            const res= await axiosInstance.get('/auth/check');

            set({authUser:res.data});
        }
        catch(err){
            set({authUser:null});

    }
},

}

));