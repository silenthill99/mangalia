<?php

namespace App\Http\Controllers;

use App\Models\Manga;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $manga = Manga::all();
        $count = Manga::count();

        return Inertia::render('dashboard', [
            'articles' => $manga,
            'nombre' => $count,
        ]);
    }
}
