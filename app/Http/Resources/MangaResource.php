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
            'price' => $this->resource->price,
            'age' => $this->resource->age,
            'description' => $this->resource->description,
            'created_at' => $this->resource->created_at,
            'user' => new UserResource($this->whenLoaded('user'))
        ];
    }
}
