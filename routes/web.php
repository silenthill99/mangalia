<?php

use App\Models\Manga;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $articles = Manga::select("title")->get();
    return Inertia::render('welcome', [
        'articles' => $articles
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('admin', function () {
    return Inertia::render('admin');
})->name('admin');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
