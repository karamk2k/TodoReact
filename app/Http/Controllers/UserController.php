<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
   public function store(UserRequest $request){ 
    $userdata=User::create($request->all());
        return response()->json([
         'status'=>'success',
         'data'=>$userdata,
         'message'=>'user created successfully'
        ]);

   }

   public function login(LoginRequest $request){
         $user=User::where('email',$request->email)->first();
         if($user){
            if(password_verify($request->password,$user->password)){
               $token = $user->createToken($user->name.'-AuthToken')->plainTextToken;
               return response()->json([
                  'status'=>'success',
                  'data'=>$user,
                  'token'=>$token
               ]);
            }
            else{
               return response()->json([
                  'status'=>'error',
                  'data'=>[],
                  'message'=>'invalid data'
               ]);
            }
         }
         else{
            return response()->json([
               'status'=>'error',
               'data'=>[],
               'message'=>'invalid data'
            ]);
         }
   }

   public function logout(Request $request){
      $request->user()->currentAccessToken()->delete();
      
      return response()->json([
         'status'=>'success',
         'data'=>[],
         'message'=>'user logged out successfully'
      ]);
   }

   public function authCh(){
      return response()->json([
         'status'=>'success',
         
      ]);
   }
}
