import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import SignUppage from './pages/SignUppage';
import Loginpage from './pages/Loginpage';
import Settingpage from './pages/Settingspage';
import Profilepage from './pages/Profilepage';
import {Routes,Route} from 'React-router-dom'; 

import {Loader} from 'lucide-react';

export const App=()=>{
  console.log("App is running");
  const {authUser,chackAuth} = useAuthStore();
  useEffect(()=>{
    chackAuth();

  },[chackAuth]);
  console.log(authUser);

  if(!authUser && isCheckingAuth)

    return(
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin"></Loader>
      </div>
  )


      return(
        <Navbar/>,
        <Routes>  
          <Route path="/" element={<Homepage/>}/>
          <Route path="/signUp" element={<SignUppage/>}/>
          <Route path="/login" element={<Loginpage/>}/>
          <Route path="/setting" element={<Settingpage/>}/>
          <Route path="/profile" element={<Profilepage/>}/>
          
          
          </Routes>


      )

}

export default App;