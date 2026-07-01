<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentaryRequest;
use App\Http\Requests\UpdateCommentaryRequest;
use App\Models\Commentary;
use App\Models\Manga;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class CommentaryController extends Controller
{
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

        return back();
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
        Gate::authorize('update', $commentary);
        $commentary->update($request->validated());

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commentary $commentary)
    {
        Gate::authorize('delete', $commentary);
        $commentary->delete();

        return back();
    }
}
