<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    public function index()
    {
        $locale = app()->getLocale();
        $cacheKey = "categories.active.{$locale}";

        $categories = Cache::remember($cacheKey, now()->addMinutes(5), function () use ($locale) {
            return Category::where('is_active', true)
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
        });

        return CategoryResource::collection($categories);
    }
}