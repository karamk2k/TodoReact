import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  function handelChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handelSubmit(e) {
    e.preventDefault();
    const res = await useStore();
    if (res.success) {
      setFormData({});
      navigate("/login");
    } else {
      alert(res.error);
    }
  }

//   useEffect(() => {
//     console.log(formData);
//   }, [formData]);

  async function useStore() {
    const url = "http://127.0.0.1:8000/api/register";

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

      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <Form onSubmit={handelSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Name"
              data={formData.name || ""}
              onchange={handelChange}
              name="name"
            />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              data={formData.email || ""}
              onchange={handelChange}
              name="email"
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Password"
              data={formData.password || ""}
              onchange={handelChange}
              name="password"
            />
          </div>
          <div className="mb-6">
            <Input
              type="password"
              placeholder="Confirm Password"
              data={formData.password_confirmation || ""}
              onchange={handelChange}
              name="password_confirmation"
            />
          </div>
          <Button type="submit" placeholder="Register" name="Register" />
        </Form>
      </div>
    </div>
  );
}
