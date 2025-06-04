<?php

namespace App\Http\Controllers;


use App\Models\Manga;
use Illuminate\Http\Request;

class MangaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|decimal:10,0',
            'age' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|max:8000',
        ]);

        $image = $request->file('image');
        $imageName = $image->getClientOriginalName();
        $path = $image->storeAs('images', $imageName, 'public');

        $article = Manga::create([
            'title' => strip_tags($request->title),
            'libelle' => $imageName,
            'path' => $path,
            'price' => $request->price,
            'age' => $request->age,
            'description' => htmlspecialchars(($request->description)),
        ]);
    }
}
