<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\SiteSortController;
use App\Http\Controllers\SiteController;

// ✅ Публичный API для получения списка активных категорий
Route::get('/categories', [CategoryController::class, 'index']);

// ✅ POST-запрос для сохранения порядка сайтов в админке (защищён аутентификацией)
Route::post('/admin/sites/sort', [SiteSortController::class, 'sort'])->middleware('auth');

// ✅ Маршрут для получения сайта по slug
Route::get('/sites/{slug}', [SiteController::class, 'showBySlug']);
