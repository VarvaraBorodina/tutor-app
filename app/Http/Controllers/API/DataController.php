<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DataController extends Controller
{
    public function getCities(Request $request) {
        $cities = City::all('id', 'city_name');
        return response($cities, 200);
    }

    public function getSubjects(Request $request) {
        $subjects = Subject::all('id', 'subject_name');
        return response($subjects, 200);
    }

    public function getTeachers(Request $request) {
        $teachers = [];

        $teachers = Teacher::all();

        $teachers_data = [];

        foreach ($teachers as $teacher) {

            $teacher_data['id'] = $teacher->id;

            if($request->city && $request->city != $teacher->city->id) {
                continue;
            }
            $teacher_data['city'] = $teacher->city->city_name;

            if($request->subject && $request->subject != $teacher->subject->id) {
                continue;
            }
            $teacher_data['subject'] = $teacher->subject->subject_name;

            $teacher_data['full_name'] = $teacher->user->last_name." ".$teacher->user->name." ".$teacher->user->second_name;

            array_push($teachers_data, $teacher_data);
        }

        return response(['teachers' =>$teachers_data], 200);
    }
}
