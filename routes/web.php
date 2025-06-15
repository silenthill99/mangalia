<?php

use App\Http\Controllers\MangaController;
use App\Models\Manga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $articles = Manga::with("user");
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

    $image = $request->file('image');
    $imageName = time().'.'.$image->getClientOriginalName();
    $imagePath = $image->storeAs('public', $imageName);

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
        $manga = Manga::with("user");
        $count = Manga::count();
        return Inertia::render('dashboard', [
            'articles' => $manga,
            'nombre' => $count
        ]);
    })->name('dashboard');
});

Route::get('sujet/{id}', function ($id) {

    $art = Manga::findOrFail($id);
    $menu = Manga::with("user")->findOrFail($id);

    return Inertia::render('sujet', [
        'article' => $art,
        'menu' => $menu
    ]);
})->name('sujet');


Route::delete('/admin-delete/{id}', [MangaController::class, "destroy"])->name('admin-delete');

Route::get("/ajout", [MangaController::class, "ajout"])->name("ajout");

Route::post("/ajout", [MangaController::class, "store"])->name("ajout");

Route::get("/update/{id}", [MangaController::class, "edit"])->name("edit");
Route::post("/update/{id}", [MangaController::class, "update"])->name("update");

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
