<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;


Route::post('/register', [UserController::class, 'store'] );
Route::post('/login', [UserController::class, 'login'] );


Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [UserController::class, 'logout'] );
        Route::get('/authCh', [UserController::class, 'authCh'] );
        Route::get('/todos', [TodoController::class, 'index'] );
        Route::post('/todos/store', [TodoController::class, 'store'] );
        Route::put('/todos/{todo}', [TodoController::class, 'update'] );
        Route::delete('/todos/delete/{todo}', [TodoController::class, 'destroy'] );

    });

