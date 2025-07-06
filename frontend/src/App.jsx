  import React, { useEffect } from 'react';
  import Navbar from './components/Navbar';
  import Homepage from './pages/Homepage';
  import SignUppage from './pages/SignUppage';
  import Loginpage from './pages/Loginpage';
  import Settingpage from './pages/Settingspage';
  import Profilepage from './pages/Profilepage';
  import {Routes,Route,Navigate} from 'react-router-dom'; 
  import { Loader } from 'lucide-react';
  import { useAuthStore } from './store/use.store';



  export const App=()=>{

    console.log("App is running");
    
    const { authUser, checkAuth } = useAuthStore();
    useEffect(() => {
     checkAuth();
    }, [checkAuth]);

      console.log(authUser);
   if (!authUser) { return (
      
      
    <div className='flex items-center justify-center h-screen'>
       <Loader className='size-10 animate-spin'/>
    </div>
      
  );
}
        return(
          <>
          <Navbar/>
          <Routes>  
            <Route path="/" element={<Homepage/> }/>
            <Route path="/signUp" element={ <SignUppage/>}/>
            <Route path="/login" element={ <Loginpage/>}/>
            <Route path="/setting" element={<Settingpage/>}/>
            <Route path="/profile" element={<Profilepage/>}/>
            
            
            </Routes>
          </>


        )

  };

  export default App;