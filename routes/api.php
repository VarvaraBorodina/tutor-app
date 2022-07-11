<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/logout', [\App\Http\Controllers\API\AuthController::class, 'logout']);

    Route::get('/student', [\App\Http\Controllers\API\UserController::class, 'getStudent'])->middleware('checkStudent');
    Route::get('/teacher/{id}', [\App\Http\Controllers\API\UserController::class, 'getTeacher']);

    Route::get('/role', [\App\Http\Controllers\API\UserController::class, 'getCurrentRole']);

    Route::post('/send-order', [\App\Http\Controllers\API\OrderController::class, 'makeOrder'])->middleware('checkStudent');

    Route::get('/get-orders', [\App\Http\Controllers\API\OrderController::class, 'getTeacherOrders']);

    Route::post('/set-order-status', [\App\Http\Controllers\API\OrderController::class, 'setOrderStatus']);

    Route::get('/teachers', [\App\Http\Controllers\API\DataController::class, 'getTeachers']);
});

Route::post('/register', [\App\Http\Controllers\API\AuthController::class, 'register']);
Route::post('/login', [\App\Http\Controllers\API\AuthController::class, 'login']);

//for html selectors
Route::get('/get-cities', [\App\Http\Controllers\API\DataController::class, 'getCities']);
Route::get('/get-subjects', [\App\Http\Controllers\API\DataController::class, 'getSubjects']);
