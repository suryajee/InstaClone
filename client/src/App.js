import React ,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar';
import "./App.css";
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import Createpost from './components/screens/Createpost';
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'

export const UserContext=createContext()

const Routing = ()=>{
  const navigate=useNavigate()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
   const user=JSON.parse(localStorage.getItem("user"))
   if(user){
     dispatch({type:"USER",payload:user})
   }
   else{
     navigate("/signin")
   }
  },[])
  return(
    
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route  exact path="/profile" element={<Profile/>}/>
    <Route path="/create" element={<Createpost/>}/>
    <Route path="/profile/:userid" element={<UserProfile/>}/>
    <Route path="/myfollowingpost" element={<SubscribedUserPosts/>}/>
    </Routes>
    
  )
}

//<Route path="expenses" element={<Expenses />} /> example dekhe h net se 
function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
   <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>
        <NavBar/>
        <Routing/>
        </BrowserRouter>
     </UserContext.Provider>
  );
}

export default App;
