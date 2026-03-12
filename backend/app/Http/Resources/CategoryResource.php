<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // Используем глобально установленную локаль
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'icon' => $this->icon,
            
            // 🔥 Переведенные поля напрямую
            'name' => $this->getTranslated('name', $locale) ?: $this->name,
            'seo_title' => $this->getTranslated('seo_title', $locale) ?: $this->seo_title,
            'seo_description' => $this->getTranslated('seo_description', $locale) ?: $this->seo_description,
            'disclaimer' => $this->getTranslated('disclaimer', $locale) ?: $this->disclaimer,
            'description' => $this->getTranslated('description', $locale) ?: $this->description,
            
            // Вложенные сайты, если они загружены
            'sites' => SiteResource::collection($this->whenLoaded('sites')),
        ];
    }
}
