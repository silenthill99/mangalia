<?php

namespace App\Http\Controllers;


use App\Models\Manga;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MangaController extends Controller
{

    public function ajout() {
        Return Inertia::render('ajout');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'age' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|max:8000',
        ], [
            'image.required' => "Tu dois choisir une image pour valider l'envoi du formulaire"
        ]);

        $image = $request->file('image');
        $imageName =  time() . '_' . $image->getClientOriginalName(); // ex: 1717861245_cover.jpg
        $path = $image->storeAs('images', $imageName, 'public');

        $article = Manga::create([
            'title' => $request->title,
            'path' => $path,
            'price' => $request->price,
            'age' => $request->age,
            'description' => $request->description,
        ]);
        return redirect()->route('admin')->with('success', 'Manga ajouté avec succès.');

    }

    function destroy ($id): RedirectResponse {
        Manga::destroy($id);
        return redirect()->route('admin')->with('success', "Article supprimé");
    }

}
