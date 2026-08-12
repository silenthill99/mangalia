<?php

namespace Database\Seeders;

use App\Enum\RoleEnum;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = array_map(fn(RoleEnum $role) => (
            [
                'code' => $role->value,
                'level' => $role->level(),
                'label' => $role->label(),
            ]
        ), RoleEnum::cases());

        Role::whereNotIn('code', array_column($roles, 'id'))->delete();

        Role::upsert($roles, uniqueBy: ['code'], update: ['label', 'level']);
    }
}
