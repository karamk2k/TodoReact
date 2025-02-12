<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Todo;
use App\Http\Requests\TodoRequest;


class TodoController extends Controller
{
    public function index()
    {
        $user = Auth::id();
        $todos = Todo::where('user_id', $user)->get();
        return response()->json([
            'status' => 'success',
            'data' => $todos
        ]);

    }

    public function store(TodoRequest $request)
    {
        $todo = Todo::create([
            'name' => $request->name,
            'description' => $request->description,
            'user_id' => Auth::id()
        ]);
        return response()->json([
            'status' => 'success',
            'data' => $todo
        ]);
    }

    public function update(TodoRequest $request, Todo $todo)
    {
        
        $todo->name = $request->name;
        $todo->description = $request->description;
        $todo->save();
        return response()->json([
            'status' => 'success',
            'data' => $todo
        ]);
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->json([
            'status' => 'success',
            'data' => $todo
        ]);
    }
    public function complete(Todo $todo){
        $todo->completed = !$todo->completed;
        $todo->save();
        return response()->json([
            'status' => 'success',
            'data' => $todo
        ]);
    }
}
