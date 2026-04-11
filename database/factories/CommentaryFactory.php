<?php

namespace Database\Factories;

use App\Models\Manga;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Commentary>
 */
class CommentaryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "user_id" => User::factory()->create(),
            "manga_id" => Manga::findOrFail(1),
            "content" => $this->faker->paragraph(),
        ];
    }
}
