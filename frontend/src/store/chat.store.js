import {create} from 'zustand';
import toast from 'react-hot-toast';
import {axiosInstance} from "../lib/axios";
import {useAuthStore} from "./use.store"


export const useChatStore = create((set, get) => ({
    messages: [],
    users: [], 
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get('/message/user');
            set({users: res.data});
        } catch (error) {
            toast.error('Failed to fetch users');
            set({isUsersLoading: false});
        }finally {
            set({isUsersLoading: false});
        }
    },
    
    getMessages: async (userId) => {
        set({isMessagesLoading: true});
        try {
            const response = await axiosInstance.get(`/message/${userId}`);
            console.trace(response.data);
            set({messages: response.data});
        } catch (error) {
            toast.error('Failed to fetch messages');
        } finally {
            set({isMessagesLoading: false});
        }

    },
    sendMessage: async(messageData)=>{
        console.log("message Send called",messageData);
        const {selectedUser,messages}=get()
        try{
            const res=await axiosInstance.post(`message/send/${selectedUser._id}`,messageData);
            // console.trace(res.data);
            set ({messages:[...messages,res.data]})
        }catch(error){
                toast.error(error.response.data.message);
        }        
    },

    subscribeToMessages:()=>{
        const {selectedUser}=get()
        if(!selectedUser) return;
        const socket=useAuthStore.getState().socket;

        socket.on("newMessage",(newMessage)=>{
        console.log("Received new message:", newMessage);
        const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
        if (!isMessageSentFromSelectedUser) return;

        set({
            messages: [...get().messages, newMessage],
        });
        });
    },


    unsubscribeFromMessages:()=>{
        const socket=useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser:(selectedUser)=>set({selectedUser}),

}));