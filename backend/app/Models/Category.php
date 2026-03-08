<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Category extends Model
{
    use HasFactory, HasTranslations;

    public $translatable = [
        'name',
        'description',
        'seo_title',
        'seo_description',
        'disclaimer'
    ];

    /**
     * ✅ Список полей, которые можно массово заполнять через create() или update()
     */
    protected $fillable = [
        'name',                        // Оригинальное имя категории (на основном языке)
        'slug',                        // Уникальный URL-код категории
        'description',                // Базовое описание (если не используем переводы)
        'icon',                        // Путь к иконке
        'is_active',                   // Флаг активности
        'disclaimer',                 // Текст дисклеймера

        // 🧠 SEO поля
        'seo_title',
        'seo_description',
    ];

    /**
     * ✅ Автоматическое преобразование JSON-полей в массив
     * Позволяет обращаться к переводу как к обычному массиву:
     * $category->name_translations['en']
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * 🔗 Связь один-ко-многим: категория имеет много сайтов
     */
    public function sites()
    {
        return $this->hasMany(\App\Models\Site::class);
    }

    /**
     * 🌍 Метод для получения переведённого значения по полю и локали
     */
    public function getTranslated(string $field, ?string $locale = null): ?string
    {
        return $this->getTranslation($field, $locale ?: app()->getLocale());
    }

    public function setTranslated(string $field, string $lang, string $value): void
    {
        $this->setTranslation($field, $lang, $value);
    }
}