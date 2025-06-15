<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Manga extends Model
{
    public $fillable = [
        'user_id', 'title', 'path', 'price', 'age', 'description'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
