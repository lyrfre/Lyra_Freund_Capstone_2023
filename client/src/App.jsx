import { useState,useEffect } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import './App.css'
import NavBar from './components/NavBar';
import UserForm from './components/UserForm'
import Home from "./Pages/Home";
import Translation from "./Pages/Translation";
import Login from "./components/Login"
import LangForm from './components/LangForm'
import Favorites from './Pages/Favorites'
import EditUser from './components/EditUser';


function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([])




  useEffect(() => {
    // auto-login
    fetch("/api/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }else{
        r.json().then((user) => console.log(user));
      }
    });

    fetch('/api/users')
    .then(r=>r.json())
    .then(data=>console.log(data))
  }, []);

  const handleSignOut = () =>{
    setUser(null)
    fetch('/api/logout', {
      method: "DELETE"
    })
  }

  const deleteUser = (id) =>{
    fetch(`/api/users/${id}`, {
      method: "DELETE"
    })
    handleSignOut()
  }

  // if (!user) return <Login onLogin={setUser} />;



  // useEffect(()=>{
    
  // },[])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar user={user} onLogin={setUser} handleLogOut={handleSignOut}/>}>
        <Route index element={<Home user={user}/>} /> 
        <Route path='login' element={<Login onLogin={setUser} />}/>
        <Route path="home" element={<LangForm users = {users}/>} />
        <Route path="createUser" element={<UserForm user={user} onLogin={setUser}/>} />
        <Route path="editUser" element={<EditUser user={user} setUser={setUser} deleteUser={deleteUser}/>} />

        <Route path="translation"element={<Translation users = {users} />} />
        <Route path="favorites" element={<Favorites users = {users} />}/>
      </Route>
    )
  )

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
