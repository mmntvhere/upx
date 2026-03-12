<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BannerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'id'       => $this->id,
            'title'    => $this->title,
            'link'     => $this->link,
            'position' => $this->position,
            'image'    => $this->image ? asset("storage/{$this->image}") : null,
        ];
    }
}
