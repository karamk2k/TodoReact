import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function Auth({ user, setUser }) {
  const [check, setCheck] = useState(null); 
  useEffect(() => {
    async function checkToken() {
      const url = "http://127.0.0.1:8000/api/authCh";
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const res = await fetch(url, { method: "GET", headers });
        const data = await res.json();

        if (!res.ok || data.status === "error") {
          throw new Error(data.message || "Something went wrong!");
        }
        setCheck(true);
      } catch (error) {
        console.log(error);
        setCheck(false);
      }
    }

    if (localStorage.getItem("token")) {
      checkToken();
    } else {
      setCheck(false);
    }
  }, []);

  
  
  useEffect(() => {
    if (check === false) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  }, [check, setUser]); 



  if (check === null) {
    return <p>Loading...</p>; 
  }

  return check ? <Outlet /> : <Navigate to="/login" />;
}
