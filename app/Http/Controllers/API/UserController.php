<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Order;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function getStudent(Request $request){

        $response = [
            'user' => auth()->user(),
            'orders' => (new OrderController)->getStudentOrders($request),
        ];

        return response($response,200);
    }

    public function getTeacher(Request $request){

        $teacher = Teacher::find($request->id);

        if(!$teacher) {
            return response(['message' => 'Not found'], 404);
        }

        $teacher['age'] = $this->userAge($teacher['date_of_birth']);

        $teacher['city_name'] = $teacher->city->city_name;
        $teacher['subject_name'] = $teacher->subject->subject_name;
        $teacher['img'] = asset($teacher['img']);

        $teacher->makeHidden(['date_of_birth', 'city_id','city', 'subject', 'subject_id']);

        $user = User::find($teacher->user_id);

        $response = [];

        if(auth()->user()->id != $user->id) {
            $user->makeHidden(['phone', 'email']);
        } else {
            $response['orders'] = (new OrderController)->getTeacherOrders($request);
        }

        $response['teacher'] = $teacher;
        $response['user'] = $user;

        return response($response, 200);
    }

    public function getCurrentRole(Request $request){
        return response(auth()->user()->role);
    }

    public function userAge($date_of_birth): string
    {
        $today = date("Y-m-d");
        $diff = date_diff(date_create($date_of_birth), date_create($today));
        return $diff->format('%y');
    }
}
