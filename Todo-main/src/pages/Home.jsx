import { useEffect, useState } from "react";
import Card from "../components/Card";
import Form from "../components/Form";
import Button from "../components/button";
import Input from "../components/Input";

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [updateData, setUpdateData] = useState({});
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchTodos();
    }, []);

    async function fetchTodos() {
        const url = "http://127.0.0.1:8000/api/todos";
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        try {
            const res = await fetch(url, { method: "GET", headers });
            const data = await res.json();
            console.log(data);
            if (!res.ok || data.status === "error") {
                throw new Error(data.message || "Something went wrong");
            }
            setTodos(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const url = "http://127.0.0.1:8000/api/todos/store";
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        try {
            const res = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to add todo");
            setTodos([...todos, data.data]); 
            setFormData({ name: "", description: "" }); 
        } catch (error) {
            console.log(error);
        }
    }

    function handleUpdate(todo) {
        setUpdateData(todo);
        setShowForm(true);
    }

    function handleCloseForm() {
        setUpdateData({});
        setShowForm(false);
    }
    function handelChange(e){
        console.log([e.target.name],e.target.value)
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    async function handelUpdateSubmit(e){
        e.preventDefault()
        console.log('up')
        const url = `http://127.0.0.1:8000/api/todos/${updateData.id}`;
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        try {
            const res = await fetch(url, {
                method: "put",
                headers,
                body: JSON.stringify(updateData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to add todo");
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === updateData.id ? { ...todo, ...updateData } : todo
                )
            );

            setShowForm(false)
             
        } catch (error) {
            console.log(error);
        }
    }

  async function handelDelete(id){
   
    const url = `http://127.0.0.1:8000/api/todos/delete/${id}`;
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
        const res = await fetch(url, {
            method: "delete",
            headers
           
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to add todo");
        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));

        setShowForm(false)
         
    } catch (error) {
        console.log(error);
    }

    }
 
    async function handelChangeStatus(id){
        const url = `http://127.0.0.1:8000/api/todos/complete/${id}`;
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        try {
            const res = await fetch(url, {
                method: "put",
                headers
               
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to add todo");
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? { ...todo, completed: !todo.completed } : todo
                )
            );
            setShowForm(false)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="bg-gray-100">
         <div className="p-6 max-w-lg mx-auto bg-gray-100 shadow-md rounded-md border border-gray-200">
    <h2 className="text-xl font-bold mb-4 text-gray-700">Add New Todo</h2>
    <Form onSubmit={handleSubmit} className="space-y-3">
        <Input 
            type="text" 
            placeholder="Name" 
            data={formData.name} 
            name="name"
            onchange={handelChange} 
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
        />
        <Input 
            type="text" 
            placeholder="Description" 
            data={formData.description} 
            name="description"
            onchange={handelChange} 
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
        />
        <Button type="submit" name="Add Todo" placeholder="Add Todo" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"/>
    </Form>
</div>


<div className="flex flex-wrap justify-center items-start min-h-screen bg-gray-100 gap-6 p-6">
    {todos.length > 0 ? (
        todos.map((todo) => (
            <Card key={todo.id} classname="bg-white shadow-md rounded-lg p-4 w-80 border border-gray-200 flex flex-wrap">
                <h3 className="text-lg font-semibold">{todo.name}</h3>
                <p className="text-gray-600">{todo.description}</p>
                <div className="flex justify-between mt-3">
                    <Button name="Update" placeholder="Update" onClick={() => handleUpdate(todo)} st="px-4 py-2 ml-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition" />
                    <Button name="Delete" placeholder="Delete" onClick={() =>handelDelete(todo.id) } st="px-4 py-2 ml-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition" />
                    <Button name={todo.completed? "Completed" : "Uncompleted"} placeholder="" onClick={() => handelChangeStatus(todo.id)}  st="px-4 py-2 ml-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition" />
                </div>
            </Card>
        ))
    ) : (
        <p className="text-gray-500">No todos available</p>
    )}
</div>


{showForm && (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-300">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Update Todo</h2>
            <Form onSubmit={handelUpdateSubmit} className="space-y-3">
                <Input 
                    type="text" 
                    placeholder="Name" 
                    data={updateData.name} 
                    name="name"
                    onchange={(e) => setUpdateData({ ...updateData, name: e.target.value })} 
                    className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
                />
                <Input 
                    type="text" 
                    placeholder="Description" 
                    data={updateData.description} 
                    name="description"
                    onchange={(e) => setUpdateData({ ...updateData, description: e.target.value })} 
                    className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
                />
                <div className="flex justify-between mt-4">
                    <Button type="submit" name="Update" placeholder="Update" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" />
                    <Button name="Cancel" placeholder="Cancel" onClick={handleCloseForm} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition" />
                </div>
            </Form>
        </div>
    </div>
)}

        </div>
    );
}
