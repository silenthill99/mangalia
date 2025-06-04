<?php

use App\Models\Manga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $articles = Manga::select("title", "path")->get();
    return Inertia::render('welcome', [
        'articles' => $articles
    ]);
})->name('home');

Route::post('/', function (Request $request) {
    $request->validate([
        'title' => 'required|string|max:255',
        'libelle' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
        'age' => 'required|string',
        'description' => 'required|string',
        'image' => 'required|image|max:8000',
    ]);

    $imagePath = $request->file('image')->store('public/mangas');

    Manga::create([
        'title' => $request->title,
        'libelle' => $request->libelle,
        'path' => $imagePath, // on stocke le chemin dans le champ 'path'
        'price' => $request->price,
        'age' => $request->age,
        'description' => $request->description,
    ]);

    return redirect()->back()->with('success', 'Manga ajouté avec succès.');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('admin', function () {
    return Inertia::render('admin');
})->name('admin');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
