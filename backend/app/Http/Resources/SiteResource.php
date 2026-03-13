<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SiteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'link' => $this->getSmartUrl(),
            'favicon' => $this->favicon,
            'preview' => $this->preview,
            'main_image' => $this->main_image,
            'position' => $this->position,
            'rating' => $this->rating,
            'enabled_languages' => $this->enabled_languages,
            'position_per_lang' => $this->position_per_lang,
            'category_id' => $this->category_id,
            
            // 🔥 Переведенные текстовые поля (никаких _translations-массивов!)
            'description' => $this->getTranslated('description', $locale) ?: $this->description,
            'review' => $this->getTranslated('review', $locale) ?: $this->review,
            'seo_title' => $this->getTranslated('seo_title', $locale) ?: $this->seo_title,
            'seo_description' => $this->getTranslated('seo_description', $locale) ?: $this->seo_description,
            
            // 🔁 Массивы (Parse JSON or Delimiter)
            'pros' => $this->translatedArray('pros', $locale),
            'cons' => $this->translatedArray('cons', $locale),

            // Связанные категории для перелинковки, теги, и сайты родительской категории (когда загружены)
            'category' => new CategoryResource($this->whenLoaded('category')),
            'tags' => $this->whenLoaded('tags'),
            'allCategories' => CategoryResource::collection($this->whenLoaded('allCategories')),
        ];
    }
}
