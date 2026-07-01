<?php

use App\Enum\RoleEnum;
use App\Models\Commentary;
use App\Models\Manga;
use App\Models\User;
use Illuminate\Support\Facades\DB;

beforeEach(function () {
    DB::table('roles')->insert([
        'level' => RoleEnum::Membre->level(),
        'label' => RoleEnum::Membre->value,
        'created_at' => now(),
        'updated_at' => now(),
    ]);
});

function createManga(User $user): Manga
{
    return Manga::create([
        'user_id' => $user->id,
        'title' => 'One Piece',
        'path' => 'one-piece.jpg',
        'note' => 5,
        'age' => 'Tout public',
        'description' => 'Un manga de pirates.',
    ]);
}

test('the author can update their commentary', function () {
    $author = User::factory()->create();
    $manga = createManga($author);
    $commentary = Commentary::factory()->for($author)->for($manga)->create([
        'content' => 'Avis initial',
    ]);

    $this->actingAs($author)
        ->put(route('commentaries.update', $commentary), ['content' => 'Avis modifié'])
        ->assertRedirect();

    expect($commentary->fresh()->content)->toBe('Avis modifié');
});

test('a user cannot update someone else\'s commentary', function () {
    $author = User::factory()->create();
    $manga = createManga($author);
    $commentary = Commentary::factory()->for($author)->for($manga)->create([
        'content' => 'Avis initial',
    ]);

    $otherUser = User::factory()->create();

    $this->actingAs($otherUser)
        ->put(route('commentaries.update', $commentary), ['content' => 'Avis modifié'])
        ->assertForbidden();

    expect($commentary->fresh()->content)->toBe('Avis initial');
});

test('guests cannot update a commentary', function () {
    $author = User::factory()->create();
    $manga = createManga($author);
    $commentary = Commentary::factory()->for($author)->for($manga)->create([
        'content' => 'Avis initial',
    ]);

    $this->put(route('commentaries.update', $commentary), ['content' => 'Avis modifié'])
        ->assertRedirect(route('login'));

    expect($commentary->fresh()->content)->toBe('Avis initial');
});

test('the content is required to update a commentary', function () {
    $author = User::factory()->create();
    $manga = createManga($author);
    $commentary = Commentary::factory()->for($author)->for($manga)->create([
        'content' => 'Avis initial',
    ]);

    $this->actingAs($author)
        ->put(route('commentaries.update', $commentary), ['content' => ''])
        ->assertSessionHasErrors('content');

    expect($commentary->fresh()->content)->toBe('Avis initial');
});
