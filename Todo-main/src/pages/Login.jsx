import Button from "../components/button";
import Form from "../components/Form";
import Input from "../components/Input";
import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Login({user, setUser}) {
  const [formData, setFormData] = useState({});
  let navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    const res = await useLogin();
    if (res.success) {
        console.table(res);
       
      setUser((pre)=>{
        return {
          ...res.data,
          token: res.token
        }

      });
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      setFormData({});
      navigate("/");

    } else {
        setUser(null);
        localStorage.clear();
      
    }
  }

  function handelChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  async function useLogin() {
    const url = "http://127.0.0.1:8000/api/login";
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
  
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(formData),
        });
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error(data.message || JSON.stringify(data.errors) || "Something went wrong!");
        }
        if(data.status === "error") {
          throw new Error(data.message || JSON.stringify(data.errors) || "Something went wrong!");
        }
  
        return { success: true , token: data.token, data: data.data };
      } catch (error) {
        console.log(error);
        return { success: false, error: error.message };
      }

  }

//   useEffect(()=>{
//         console.log(formData);
//       },[formData]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Form onSubmit={onSubmit}>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              data={formData.email || ""}
              onchange={handelChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              data={formData.password || ""}
              onchange={handelChange}
            />
          </div>
          <Button type="submit" placeholder="Login" name="Login" />
        </Form>
      </div>
    </div>
  );
}
