<?php

namespace App\Models;

use App\Enum\RoleEnum;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = [
        "level",
        "label"
    ];

    protected function casts(): array
    {
        return [
            'label' => RoleEnum::class,
        ];
    }

    public function users() {
        return $this->hasMany(User::class);
    }
}
