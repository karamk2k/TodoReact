import React, {  useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate } from "react-router-dom";

 function Navbar ({user, setUser})  {
let navigation = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(true);
  // const [Auth, setAuth] = useState(false);
  const t=user;
  let Auth=false;
  if (t!== null) {
    Auth=true;
  }
  else {
    Auth=false;
  }
  

  // useEffect(() => {
   
    
  //   if (t!== null) {
  //     setAuth(true);
      
  //   }
  //   else {
  //     setAuth(false);
     

  //   }
  // }
  // ,[user])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  function logout() {
    const res=useLogout();
   

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigation("/login");
  }

 async function useLogout(){
  const url = "http://127.0.0.1:8000/api/logout";
  // const token = localStorage.getItem("token");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
  };
  try {
    const res =  await fetch(url, {
      method: "POST",
      headers: headers,
     
    });
    const data = await res.json();
    if(!res.ok) {
      throw new Error(data.message || JSON.stringify(data.errors) || "Something went wrong");
    }
    return {sc: true};
  } catch (error) {
    console.log(error);
    return {sc: false, error: error.message};
  }
 }

  return (
    <nav className="w-full bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
        
          <a href="#" className="text-2xl font-bold text-gray-800">
           Todo
          </a>
       
       
          <div className="lg:hidden"> 
            <button
              onClick={toggleCollapse}
              className="text-gray-800 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {isCollapsed ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              )}
            </button>
          </div>
         
         
          <div className={`lg:flex lg:items-center ${isCollapsed ? 'hidden lg:flex' : 'block'}`}>
            <ul className="flex flex-col lg:flex-row lg:space-x-8 mt-4 lg:mt-0">
              <li>
                <a
                  href="#"
                  className="block text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded"
                >
                  Home
                </a>
              </li>
              {Auth  ? (
                <>
  <p className="block text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded">Welcome, {t.name}!</p>
  <button className="block text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded" onClick={logout} >Logout</button>
</> ) : (
  <>
    <li>
      <Link
        to="/register"
        className="block text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded"
      >
        Register
      </Link>
    </li>
    <li>
      <Link
        to="/login"
        className="block text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded"
      >
        Login
      </Link>
    </li>
  </>
)}

            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
