<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentaryRequest;
use App\Http\Requests\UpdateCommentaryRequest;
use App\Models\Commentary;
use App\Models\Manga;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class CommentaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Manga $manga, User $user) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentaryRequest $request, Manga $manga)
    {
        $data = $request->validated();
        $user = Auth::user();
        $commentary = $manga->commentaries()->make($data);
        $commentary->user()->associate($user);
        $commentary->save();

        return response()->json($commentary);
    }

    /**
     * Display the specified resource.
     */
    public function show(Commentary $commentary)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Commentary $commentary)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentaryRequest $request, Commentary $commentary)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commentary $commentary)
    {
        Gate::authorize('delete', $commentary);
        $commentary->delete();
    }
}
