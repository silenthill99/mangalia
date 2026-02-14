<?php

use App\Http\Controllers\MangaController;
use App\Models\Manga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $articles = Manga::with("user")->get();
    return Inertia::render('welcome', [
        'articles' => $articles
    ]);
})->name('home');

Route::post('/', function (Request $request) {
    $data = $request->validate([
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

    Manga::create($data);

    return redirect()->back()->with('success', 'Manga ajouté avec succès.');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $manga = Manga::all();
        $count = Manga::count();
        return Inertia::render('dashboard', [
            'articles' => $manga,
            'nombre' => $count
        ]);
    })->name('dashboard');
});

Route::get('sujet/{art}', function (Manga $art) {
    $menu = Manga::all();

    return Inertia::render('sujet', [
        'article' => $art,
        'menu' => $menu
    ]);
})->name('sujet');


Route::delete('/admin-delete/{manga}', [MangaController::class, "destroy"])->name('admin-delete');

Route::get("/ajout", [MangaController::class, "ajout"])->name("ajout");

Route::post("/ajout", [MangaController::class, "store"])->name("ajout.store");

Route::get("/update/{manga}", [MangaController::class, "edit"])->name("edit");
Route::post("/update/{manga}", [MangaController::class, "update"])->name("update");

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
