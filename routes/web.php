<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MangaController;
use App\Models\Manga;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $articles = Manga::with('user')->get();

    return Inertia::render('welcome', [
        'articles' => $articles,
    ]);
})->name('home');

Route::get('sujet/{art}', [MangaController::class, 'show'])->name('sujet');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::delete('/admin-delete/{manga}', [MangaController::class, 'destroy'])->name('admin-delete');
    Route::get('/ajout', [MangaController::class, 'ajout'])->name('ajout');
    Route::post('/ajout', [MangaController::class, 'store'])->name('ajout.store');
    Route::get('/update/{manga}', [MangaController::class, 'edit'])->name('edit');
    Route::put('/update/{manga}', [MangaController::class, 'update'])->name('update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
