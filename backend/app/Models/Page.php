<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Translatable\HasTranslations;

class Page extends Model
{
    use HasFactory, HasTranslations;

    public $translatable = [
        'title',
        'content',
        'seo_title',
        'seo_description'
    ];

    protected $fillable = [
        'title',
        'slug',
        'content',
        'is_active',
        'position',
        'seo_title',
        'seo_description'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
