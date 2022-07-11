<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $role = $request['role'];

        if($role == 1) {
            $file = $request->file('img');

            $user_fields = $request->validate([
                'email' => 'required|email|string|unique:users',
                'password' => 'required|string',
                'name' => 'required|string',
                'last_name' => 'required|string',
                'second_name' => 'required|string',
                'phone' => 'required|string',
                'role' => ['required', Rule::in([0,1,2])],
            ]);

            $teacher_fields = $request->validate([
                'city_id' => 'required|numeric',
                'subject_id' => 'required|numeric',
                'date_of_birth' => 'date',
                'education' => 'required|string',
                'price' => 'required|numeric',
                'img' => 'mimes:jpg,png,jpeg',
                'work_experience' => 'required|string',
                'description' => 'string',
            ]);

            $user_fields['password'] = bcrypt($user_fields['password']);
            $user = User::create($user_fields);

            if($file){
                $name = time();
                $file->storeAs('teacher_images', $name.".".$file->getClientOriginalExtension(), 'public');
                $image = '/storage/teacher_images/'.$name.".".$file->getClientOriginalExtension();
                $teacher_fields['img'] = $image;
            }

            $teacher_fields['user_id'] = $user->id;

            $teacher = Teacher::create($teacher_fields);

            $response = [
                'token' => $user->createToken('token')->plainTextToken,
                'teacher_id' => $teacher->id,
            ];

            return response($response, 201);
        }
        else {
            $fields = $request->validate([
                'email' => 'required|email|string|unique:users',
                'password' => 'required|string',
                'name' => 'required|string',
                'last_name' => 'required|string',
                'second_name' => 'required|string',
                'phone' => 'required|string',
                'role' => ['required', Rule::in([0,1,2])],
            ]);

            $fields['password'] = bcrypt($fields['password']);
            $fields['role'] = "2";

            $user = User::create($fields);

            $response = [
                'token' => $user->createToken('token')->plainTextToken,
            ];

            return response($response, 201);

        }
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return response(['message' => 'logout']);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email|string',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $fields['email'])->first();

        if(!$user){
            return response([
                'error' => 'invalid email',
            ], 200);
        }

        if(!Hash::check($fields['password'], $user->password)) {
            return response([
                'error' => 'incorrect password',
            ], 200);
        }

        $token = $user->createToken('token')->plainTextToken;
        $role = $user->role;

        $response = [
            'token' => $token,
            'role' => $role,
        ];

        if($role == 1) {
            $response['teacher_id'] = $user->teacher->id;
        }
        return response($response, 200);
    }
}
