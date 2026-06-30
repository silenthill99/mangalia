<?php

namespace App\Models;

use Database\Factories\CommentaryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Commentary extends Model
{
    /** @use HasFactory<CommentaryFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'manga_id',
        'content',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function manga(): BelongsTo
    {
        return $this->belongsTo(Manga::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'commentary_reactions');
    }
}
