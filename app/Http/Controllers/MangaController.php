<?php

namespace App\Http\Controllers;

use App\Models\Manga;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MangaController extends Controller
{
    public function ajout(): Response
    {
        return Inertia::render('ajout');
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
            'image.required' => "Tu dois choisir une image pour valider l'envoi du formulaire",
        ]);

        $image = $request->file('image');
        $imageName = time().'_'.$image->getClientOriginalName(); // ex: 1717861245_cover.jpg
        $path = $image->storeAs('images', $imageName, 'public');

        auth()->user()->mangas()->create([
            'title' => $request->title,
            'path' => $path,
            'price' => $request->price,
            'age' => $request->age,
            'description' => $request->description,
        ]);

        return redirect()->route('dashboard')->with('success', 'Manga ajouté avec succès.');

    }

    public function destroy(Manga $manga): RedirectResponse
    {
        $this->deleteImage($manga->path);
        $manga->delete();

        return redirect()->back()->with('success', 'Article supprimé');
    }

    public function edit(Manga $manga): Response
    {
        return Inertia::render('update', ['article' => $manga]);
    }

    public function update(Manga $manga, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'age' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:8000',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time().'_'.$image->getClientOriginalName();
            $validated['path'] = $image->storeAs('images', $imageName, 'public');
            $this->deleteImage($manga->path);
        }

        $manga->update($validated);

        return redirect()->route('dashboard')->with('success', 'Manga mis à jour.');
    }

    public function show(Manga $art)
    {
        $menu = Manga::all();

        return Inertia::render('sujet', [
            'article' => $art,
            'menu' => $menu,
        ]);
    }

    public function deleteImage(string $path)
    {
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
