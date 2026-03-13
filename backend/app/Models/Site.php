<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Site extends Model
{
    use HasFactory, HasTranslations;

    public $translatable = [
        'seo_title',
        'seo_description',
        'description',
        'review',
        'pros',
        'cons'
    ];

    protected $fillable = [
        'name',
        'slug',
        'link',
        'preview',
        'favicon',
        'main_image',
        'rating',
        'position',
        'is_active',
        'category_id',
        'description',
        'review',
        'pros',
        'cons',
        'seo_title',
        'seo_description',
        'enabled_languages', 
        'position_per_lang',
        'affiliate_url',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'rating' => 'float',
        'enabled_languages' => 'array', 
        'position_per_lang' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    /**
     * Получить перевод текстового поля
     */
    public function getTranslated(string $field, ?string $locale = null): ?string
    {
        return $this->getTranslation($field, $locale ?: app()->getLocale());
    }

    /**
     * Получить массив строк из поля или переводов (для плюсов/минусов)
     */
    public function translatedArray(string $key, ?string $locale = null): array
    {
        $value = $this->getTranslation($key, $locale ?: app()->getLocale());

        if (empty($value)) {
            return [];
        }

        if (is_array($value)) {
            return array_filter(array_map('trim', $value));
        }

        // Разбиваем по переносу строки
        return array_filter(array_map('trim', preg_split('/[\r\n]+/', $value)));
    }

    /**
     * Получить позицию сайта для текущего языка
     */
    public function getPositionForLocale(string $locale = 'en'): ?int
    {
        if (!is_array($this->position_per_lang)) {
            return null;
        }

        return $this->position_per_lang[$locale] ?? null;
    }

    /**
     * Установить позицию сайта для конкретного языка
     */
    public function setPositionForLocale(string $locale, int $position): void
    {
        $data = $this->position_per_lang ?? [];
        $data[$locale] = $position;
        $this->position_per_lang = $data;
    }

    /**
     * 🔥 Генерирует финальную ссылку по "Умной логике"
     */
    public function getSmartUrl(): string
    {
        $affUrl = trim((string)$this->affiliate_url);
        
        // 1. Если пусто — клеим стандартный ref
        if (empty($affUrl)) {
            $separator = str_contains($this->link, '?') ? '&' : '?';
            return $this->link . $separator . 'ref=beinporn';
        }

        // 2. Если это полный URL (начинается с http)
        if (str_starts_with($affUrl, 'http')) {
            // В будущем здесь будет bnprn.link, а пока отдаем как есть через прокси
            return route('site.go', ['slug' => $this->slug]);
        }

        // 3. Если это хэш (просто строка без http)
        $separator = str_contains($this->link, '?') ? '&' : '?';
        return $this->link . $separator . 'ref=' . $affUrl;
    }
}