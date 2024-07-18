<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $token = $request->token;
        $now_dt = date("Y-m-d H:i:s");

        if (strlen($token) == 0) {
            return response()->json([
                'code' => 0,
                'messages' => 'token empty'
            ]);
        }
        // $data = Users::where('username', $username)->first();
        $data = DB::table('users')->where('token', $token)->first();
        if ($data) {
            $res = [
                'id' => $data->id,
                'username' => $data->username,
                'email' => $data->email,
                'token' => $data->token,
                'created_at' => $data->created_at,
                'ip' => $data->ip,
                'status' => $data->status,
                'login_time' => $now_dt,
            ];
            return response()->json([
                'code' => 1,
                'data' => $res
            ]);
        } else {
            return response()->json([
                'code' => -1,
                'message' => 'user not found'
            ]);
        }
    }
}
