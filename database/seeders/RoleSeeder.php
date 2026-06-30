<?php

namespace Database\Seeders;

use App\Enum\RoleEnum;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('roles')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        foreach (RoleEnum::cases() as $role) {
            DB::table('roles')->insert([
                'level' => $role->level(),
                'label' => $role->value,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
