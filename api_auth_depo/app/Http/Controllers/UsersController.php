<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use Illuminate\Support\Facades\DB;
use Stevebauman\Location\Facades\Location;

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
        $ip = $request->ip;
        $ip_replace = str_replace(' ', '#', $ip);

        if (strlen($token) == 0) {
            return response()->json([
                'code' => 0,
                'messages' => 'token empty'
            ]);
        }

        $data = DB::table('users')->where('token', $token)->first();
        if ($data) {
            DB::table('users')->where('id', $data->id)->update(['ip' => $ip_replace]);
            $IP = str_replace('#', ' ', $data->ip);
            $res = [
                'id' => $data->id,
                'username' => $data->username,
                'email' => $data->email,
                'token' => $data->token,
                'created_at' => $data->created_at,
                'ip' => $IP,
                'status' => $data->status,
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
