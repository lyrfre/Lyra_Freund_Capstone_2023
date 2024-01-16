import { useState,useEffect } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './assets/components/NavBar';
import User from './assets/components/User'
import Home from "./assets/Pages/Home";
import Translation from "./assets/Pages/Translation";


function App() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;



  const [users,setUsers] = useState([])
  useEffect(()=>{
    fetch('http://127.0.0.1:5555/users')
    .then(r=>r.json())
    .then(data=>setUsers(data))
  },[])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} /> 
        <Route path="home" element={<LangForm users = {users}/>} />
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
