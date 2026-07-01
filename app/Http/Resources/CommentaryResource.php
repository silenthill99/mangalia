<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentaryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->whenLoaded('user')),
            'manga' => new MangaResource($this->whenLoaded('manga')),
            'users' => UserResource::collection($this->whenLoaded('users')),
            'content' => $this->content,
            'can_delete' => $request->user()?->can('delete', $this->resource) ?? false,
            'can_update' => $request->user()?->can('update', $this->resource) ?? false,
        ];
    }
}
