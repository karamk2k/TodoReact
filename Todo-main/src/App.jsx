  import React, { use } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router";
import {useState, useEffect} from "react";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Auth from "./middlewares/Auth";

import "./App.css"


function App() {
  let [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token"); 
    return storedUser ? { ...storedUser, token } : null;
});
//  useEffect(() => {
//   console.table(user);
//  }, [user]);

  return (
    <div>
   
    <BrowserRouter>
     <Navbar user={user|| null } setUser={setUser} />
      <Routes>
       
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login user={user} setUser={setUser}/>} />


        <Route element={<Auth user={user} setUser={setUser} />}>

        <Route path="/" element={<Home />} />


        </Route>


      </Routes>
    </BrowserRouter>
     
    </div>
  )
}

export default App
