<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Manga extends Model
{
    public $fillable = [
        'user_id', 'title', 'path', 'note', 'age', 'description',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function commentaries(): HasMany
    {
        return $this->hasMany(Commentary::class);
    }

    protected static function booted(): void
    {
        static::creating(function ($manga) {
            $title = $manga->title;
            $manga->slug = Str::slug($title);
        });
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
