<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Manga extends Model
{
    public $fillable = [
        'title', 'path', 'price', 'age', 'description'
    ];
}
