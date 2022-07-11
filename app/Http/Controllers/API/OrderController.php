<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use League\CommonMark\Node\Query\OrExpr;

class OrderController extends Controller
{
    public function makeOrder(Request $request) {

        $order_fields = $request->validate([
            'description' => 'string',
            'price' => 'required|numeric',
            'teacher_user_id' => 'required|numeric',
        ]);

        $order_fields['teacher_user_id'] = Teacher::find($order_fields['teacher_user_id'])->user_id;
        $order_fields['student_user_id'] = auth()->user()->id;
        $order_fields['status'] = "0";

        return response(Order::create($order_fields), 201);
    }

    public function getStudentOrders(Request $request) {
        $orders = auth()->user()->order;
        foreach ($orders as $order) {
            $order->teacher->user;
        }
        return $orders;
    }

    public function getTeacherOrders(Request $request) {

        $orders = auth()->user()->teacher->order;
        foreach ($orders as $order) {
            $order->user;
        }
        return $orders;
    }

    public function setOrderStatus(Request $request) {
        $order = Order::find($request->id);

        if($order->teacher_user_id !== auth()->user()->id) {
            return response(['message' => 'other user'], 403);
        }

        if($request->status !== "-1" && $request->status !== "1" && $order->status !== "0") {
            return response(['message' => 'bad status'], 403);
        }

        DB::table('orders')->where('id', $request->id)->update(['status' => $request->status]);

        return Order::find($request->id);
    }
}
