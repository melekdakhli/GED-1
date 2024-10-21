<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'access_token', 'refresh_token', 'access_token_expires_at', 'refresh_token_expires_at'];
}
