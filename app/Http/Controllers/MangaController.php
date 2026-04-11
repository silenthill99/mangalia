<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMangaRequest;
use App\Http\Requests\UpdateMangaRequest;
use App\Http\Resources\CommentaryResource;
use App\Http\Resources\MangaResource;
use App\Models\Manga;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MangaController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('mangas/create');
    }

    public function store(StoreMangaRequest $request)
    {
        $data = $request->validated();

        $image = $request->file('image');
        $imageName = time().'_'.$image->getClientOriginalName();
        $data['path'] = $image->storeAs('images', $imageName, 'public');

        auth()->user()->mangas()->create($data);

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
        Gate::authorize('update', $manga);

        return Inertia::render('mangas/edit', ['article' => new MangaResource($manga)]);
    }

    public function update(Manga $manga, UpdateMangaRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time().'_'.$image->getClientOriginalName();
            $validated['path'] = $image->storeAs('images', $imageName, 'public');
            $this->deleteImage($manga->path);
        }

        $manga->update($validated);

        return redirect()->route('dashboard')->with('success', 'Manga mis à jour.');
    }

    public function show(Manga $manga): Response
    {
        $menu = Manga::all();
        $commentaries = $manga->commentaries()->orderBy('created_at', 'desc')->get();
        $commentaries->load('user');

        return Inertia::render('mangas/show', [
            'article' => new MangaResource($manga),
            'menu' => MangaResource::collection($menu),
            'commentaries' => CommentaryResource::collection($commentaries),
        ]);
    }

    public function deleteImage(string $path)
    {
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
