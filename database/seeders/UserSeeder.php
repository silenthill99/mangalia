<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use function Symfony\Component\String\b;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => "Florian GRAZIANI",
            "email" => "florian.graziani@sfr.fr",
            "email_verified_at" => now(),
            "password" => bcrypt("Mylene.10"),
            "remember_token" => null,
            "created_at" => now(),
            "updated_at" => now()
        ]);
    }
}
