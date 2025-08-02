  import React, { useEffect } from 'react';
  import Navbar from './components/Navbar';
  import Homepage from './pages/Homepage';
  import SignUppage from './pages/SignUppage';
  import Loginpage from './pages/Loginpage';
  import Settingpage from './pages/Settingspage';
  import Profilepage from './pages/Profilepage';
  import {Routes,Route,Navigate} from 'react-router-dom'; 
  import { Loader } from 'lucide-react';
  import { Toaster } from "react-hot-toast";

  import { useAuthStore } from './store/use.store';
  import {useThemeStore} from "./store/use.Them"



  export const App=()=>{

    console.log("App is running");
    
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
   const { theme } = useThemeStore();
    useEffect(() => {
     checkAuth();
    }, [checkAuth]);

      console.log(onlineUsers);
   if (!checkAuth && !authUser) { return (
    <div className='flex items-center justify-center h-screen'>
       <Loader className='size-10 animate-spin'/>
    </div>
      
  );
}
        return(
          <>
          <Navbar/>
          <Routes>  
          <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUppage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Loginpage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Settingpage />} />
        <Route path="/profile" element={authUser ? <Profilepage /> : <Navigate to="/login" />} />
            
            
            </Routes>
            <Toaster />
          </>


        )

  };

  export default App;