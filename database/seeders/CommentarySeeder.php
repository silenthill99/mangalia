<?php

namespace Database\Seeders;

use App\Http\Resources\CommentaryResource;
use App\Models\Commentary;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
//        DB::table('commentaries')->truncate();
        Commentary::factory()->count(10)->create();
    }
}
