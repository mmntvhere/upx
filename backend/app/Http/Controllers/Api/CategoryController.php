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
        $cacheKey = "categories.active.{$locale}.v2";

        $categories = Cache::remember($cacheKey, now()->addMinutes(10), function () use ($locale) {
            return Category::where('is_active', true)
                ->with(['sites' => function ($query) use ($locale) {
                    $query->where('is_active', true)
                          ->where(function ($q) use ($locale) {
                              $q->whereJsonContains('enabled_languages', $locale)
                                ->orWhereNull('enabled_languages')
                                ->orWhere('enabled_languages', '[]');
                          })
                          ->orderByRaw("COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(position_per_lang, '$.\"{$locale}\"')) AS SIGNED), position, 999999) ASC")
                          ->orderBy('id', 'desc');
                }])
                ->get();
        });

        return CategoryResource::collection($categories);
    }

    public function show($slug)
    {
        $locale = app()->getLocale();
        $sort = request()->query('sort', 'popular');

        $category = Category::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        // Загружаем сайты с учетом локали и выбранной сортировки
        $sitesQuery = $category->sites()
            ->where('is_active', true)
            ->where(function ($q) use ($locale) {
                $q->whereJsonContains('enabled_languages', $locale)
                  ->orWhereNull('enabled_languages')
                  ->orWhere('enabled_languages', '[]');
            });

        switch ($sort) {
            case 'new':
                $sitesQuery->orderBy('id', 'desc');
                break;
            case 'top':
                $sitesQuery->orderBy('rating', 'desc');
                break;
            case 'popular':
            default:
                $sitesQuery->orderByRaw("COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(position_per_lang, '$.\"{$locale}\"')) AS SIGNED), position, 999999) ASC")
                           ->orderBy('id', 'desc');
                break;
        }

        $category->setRelation('sites', $sitesQuery->get());

        return new CategoryResource($category);
    }
}