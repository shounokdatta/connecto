import React from 'react'
import {useChatStore} from '../store/chat.store';
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContener from '../components/ChatContener';


export default function Homepage() {
  const {selectedUser}= useChatStore();
  return (
    <div className='h-screen bg-base-200'>
      <div className="flex items-center justify-center pt-10 px-4">
        <div className="bg-base-100 round-lg shadow-cl w-full max-w-6xl h-[calc(100vh-6rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContener />}
            </div>
        </div>


      </div>
      
    </div>
  )
}
