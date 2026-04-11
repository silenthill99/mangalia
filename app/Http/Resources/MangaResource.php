<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MangaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'title' => $this->resource->title,
            'path' => $this->resource->path,
            'note' => $this->resource->note,
            'age' => $this->resource->age,
            'description' => $this->resource->description,
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
            'user' => new UserResource($this->whenLoaded('user')),
            'commentaries' => CommentaryResource::collection($this->whenLoaded('commentaries')),
        ];
    }
}
