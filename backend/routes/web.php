<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\SiteSortController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\Admin\TranslationController;

// 🔹 Главная страница
Route::get('/', function () {
    return view('welcome');
});

// 🔹 Дашборд после входа
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// 🔐 Авторизованные маршруты
Route::middleware('auth')->group(function () {

    // 🔸 Профиль пользователя
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // 🔧 Админка
    Route::prefix('admin')->name('admin.')->group(function () {

        // 🔸 Главная страница админки
        Route::get('/', function () {
            return view('admin.dashboard');
        })->name('dashboard');

        // 🧩 Drag-and-drop сортировка сайтов
        Route::post('/sites/sort', [SiteSortController::class, 'sort'])->name('sites.sort');

        // 🧩 Удаление иконки у категории
        Route::delete('/categories/{category}/remove-icon', [CategoryController::class, 'removeIcon'])
            ->name('categories.removeIcon');

        // 🧩 CRUD для категорий, сайтов и тегов
        Route::resource('categories', CategoryController::class)->except(['show']);
        Route::resource('sites', SiteController::class)->except(['show']);
        Route::resource('tags', TagController::class)->except(['show']);

        // 🧩 Удаление изображений у сайтов
        Route::delete('/sites/{site}/remove-image/{field}', [SiteController::class, 'removeImage'])
            ->name('sites.removeImage');

        // 🔤 Перевод полей через Deepl
        Route::get('/translate', function () {
            return view('admin.translate');
        })->name('translate.form');

        Route::post('/translate', [TranslationController::class, 'autoTranslate'])->name('translate.auto');
    });
});

// 🔒 Отключение публичной регистрации
Route::get('/register', function () {
    abort(403, 'Регистрация отключена.');
});

require __DIR__.'/auth.php';