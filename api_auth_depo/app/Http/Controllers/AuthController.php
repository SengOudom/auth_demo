<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     */

    public function register(Request $request)
    {
        $username = $request->username;
        $email = $request->email;
        $password = $request->password;
        $now_dt = date("Y-m-d H:i:s");
        $token = Str::random(80);
        $pass_hash = Hash::make($password);

        if (strlen($username) == 0) {
            return response()->json([
                'code' => 0,
                'message' => 'username empty',
            ]);
        }
        if (strlen($email) == 0) {
            return response()->json([
                'code' => 0,
                'message' => 'email empty',
            ]);
        }
        if (strlen($password) == 0) {
            return response()->json([
                'code' => 0,
                'message' => 'password empty',
            ]);
        }

        $user_chcek = DB::table('users')->where('username', $username)->first();

        if ($user_chcek) {
            return response()->json([
                'code' => -2,
                'message' => 'already exit',
            ]);
        }

        $values = ['username' => $username, 'password' => $pass_hash, 'email' => $email, 'token' => $token, 'created_at' => $now_dt,];
        $res = DB::table('users')->insert($values);

        if ($res) {
            return response()->json([
                'code' => 1,
                'errMsg' => 'success',
            ]);
        } else {
            return response()->json([
                'code' => -1,
                'errMsg' => 'fail register'
            ]);

        }
    }
    public function login(Request $request)
    {
        $username = $request->username;
        $password = $request->password;
        $token = Str::random(80);
        $now_dt = date("Y-m-d H:i:s");

        if (strlen($username) == 0) {
            return response()->json([
                'code' => 0,
                'message' => 'username empty',
            ]);
        }

        if (strlen($password) == 0) {
            return response()->json([
                'code' => 0,
                'message' => 'password empty',
            ]);
        }

        $data = DB::table('users')->where('username', $username)->first();
        if ($data) {
            $user_check = $data->username;
            $pass_hash = $data->password;
            $pass_chcek = Hash::check($password, $pass_hash);
            if ($user_check && $pass_chcek) {
                DB::table('users')->where('id', $data->id)->update(['token' => $token]);
                $res = DB::table('users')->where('username', $username)->first();
                return response()->json([
                    'code' => 1,
                    'data' => [
                        'id' => $res->id,
                        'username' => $res->username,
                        'email' => $res->email,
                        'token' => $res->token,
                        'created_at' => $res->created_at,
                        'ip' => $res->ip,
                        'status' => $res->status,
                        'login_time' => $now_dt,
                    ]
                ]);
            } else {
                return response()->json([
                    'code' => -1,
                    'message' => 'username or password is incorrect'
                ]);
            }
        } else {
            return response()->json([
                'code' => 0,
                'message' => 'fail login'
            ]);

        }
    }

    public function logout(Request $request)
    {
        $token = $request->token;
        if (strlen($token) == 0) {
            return response()->json([
                'code' => 0,
                'messages' => 'token empty'
            ]);
        }
        // $data = Users::where('username', $username)->first();
        $data = DB::table('users')->where('token', $token)->first();
        if ($data) {
            return response()->json([
                'code' => 1,
                'message' => 'success'
            ]);
        } else {
            return response()->json([
                'code' => 0,
                'message' => 'fail logout'
            ]);
        }
    }
}