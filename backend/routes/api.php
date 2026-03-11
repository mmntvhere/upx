<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\SiteSortController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\Api\PageController; // Added this use statement

Route::middleware(['throttle:api'])->group(function () {
    // ✅ Системный конфиг (языки и т.д.)
    Route::get('/config', function() {
        return response()->json([
            'languages' => config('languages.codes')
        ]);
    });

    // ✅ Публичный API
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/banners', [BannerController::class, 'index']);

    // ✅ Маршрут для получения сайта по slug
    Route::get('/sites/{slug}', [SiteController::class, 'showBySlug']);

    // ✅ Маршруты для страниц
    Route::get('/pages', [PageController::class, 'index']);
    Route::get('/pages/{slug}', [PageController::class, 'show']);
});

// ✅ POST-запрос для сохранения порядка сайтов в админке (защищён аутентификацией)
Route::post('/admin/sites/sort', [SiteSortController::class, 'sort'])->middleware('auth');
