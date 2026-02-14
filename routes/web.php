<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MangaController;
    use App\Http\Resources\MangaResource;
    use App\Models\Manga;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $articles = Manga::with('user')->get();

    return Inertia::render('welcome', [
        'articles' => MangaResource::collection($articles),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::resource('mangas', MangaController::class)->except(['index', 'show']);
});

Route::resource('mangas', MangaController::class)->only(['show']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
