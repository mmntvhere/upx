<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $locale = request()->header('Accept-Language', 'en');
        if (!in_array($locale, config('languages.codes'))) {
            $locale = 'en';
        }
        app()->setLocale($locale);

        $categories = Category::where('is_active', true)
            ->with(['sites' => function ($query) use ($locale) {
                $query->where('is_active', true)
                      ->where(function ($q) use ($locale) {
                          $q->whereJsonContains('enabled_languages', $locale)
                            ->orWhereNull('enabled_languages')
                            ->orWhere('enabled_languages', '[]');
                      })
                      ->orderByRaw("COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(position_per_lang, '$.\"{$locale}\"')) AS SIGNED), position) ASC");
            }])
            ->get();

        return \App\Http\Resources\CategoryResource::collection($categories);
    }
}