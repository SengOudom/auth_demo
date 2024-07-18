<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $table      = 'users';
    protected $primaryKey = 'id';
    //avoid auto add update_at, create_at
    public $timestamps = false;
}
