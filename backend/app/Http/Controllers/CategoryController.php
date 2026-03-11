<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * Отображает список категорий в админке с сортировкой и пагинацией.
     */
    public function index(Request $request)
    {
        // ✅ Защита от SQL-инъекций: разрешаем сортировку только по конкретным полям
        $allowedSort = ['id', 'name', 'slug', 'is_active', 'created_at'];
        $sort = $request->get('sort', 'id');
        if (!in_array($sort, $allowedSort)) {
            $sort = 'id';
        }

        $direction = strtolower($request->get('direction', 'asc')) === 'desc' ? 'desc' : 'asc';

        $categories = Category::orderBy($sort, $direction)->paginate(10);

        return view('admin.categories.index', compact('categories', 'sort', 'direction'));
    }

    /**
     * API-метод для фронтенда: возвращает категории с сайтами (только активные сайты).
     */
    public function apiIndex(Request $request): JsonResponse
    {
        $categories = Category::with([
            'sites' => function ($query) {
                $query->where('is_active', true)->orderBy('position');
            }
        ])->get();

        return response()->json(\App\Http\Resources\CategoryResource::collection($categories));
    }

    /**
     * Форма создания новой категории.
     */
    public function create()
    {
        return view('admin.categories.create');
    }

    /**
     * Сохраняет новую категорию с мультиязычными полями.
     */
    public function store(Request $request)
    {
        // Валидация базовых полей
        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'slug'             => 'nullable|string|max:255|unique:categories,slug',
            'seo_title'        => 'nullable|string|max:255',
            'seo_description'  => 'nullable|string',
            'description'      => 'nullable|string',
            'disclaimer'       => 'nullable|string',
            'icon'             => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Если slug не указан — создаём автоматически из названия
        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['name']);

        // Чекбокс активности
        $validated['is_active'] = $request->boolean('is_active');

        // Загрузка иконки, если есть
        if ($request->hasFile('icon')) {
            $validated['icon'] = $request->file('icon')->store('category_icons', 'public');
        }

        // Сохраняем категорию
        $category = Category::create($validated);

        // Мультиязычные поля
        $transFields = ['name', 'description', 'seo_title', 'seo_description', 'disclaimer'];
        foreach ($transFields as $field) {
            $translations = $request->input("translations.{$field}", []);
            if ($request->filled($field)) {
                $translations['en'] = $request->input($field);
            }
            $category->setTranslations($field, $translations);
        }
        $category->save();

        return redirect()->route('admin.categories.index')->with('success', 'Category created successfully.');
    }

    /**
     * Форма редактирования категории.
     */
    public function edit(Category $category)
    {
        return view('admin.categories.edit', compact('category'));
    }

    /**
     * Обновление категории, включая мультиязычные поля.
     */
    public function update(Request $request, Category $category)
    {
        // Валидация
        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'slug'             => 'nullable|string|max:255|unique:categories,slug,' . $category->id,
            'seo_title'        => 'nullable|string|max:255',
            'seo_description'  => 'nullable|string',
            'description'      => 'nullable|string',
            'disclaimer'       => 'nullable|string',
            'icon'             => 'nullable|image|max:2048',
        ]);

        // Если slug не указан — создаём автоматически
        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['name']);
        $validated['is_active'] = $request->boolean('is_active');

        // Обновление иконки: удаляем старый файл перед загрузкой нового
        if ($request->hasFile('icon')) {
            if ($category->icon && \Storage::disk('public')->exists($category->icon)) {
                \Storage::disk('public')->delete($category->icon);
            }
            $validated['icon'] = $request->file('icon')->store('category_icons', 'public');
        }

        // Сохраняем обновления (базовые поля)
        $category->update($validated);

        // Обновляем переводы
        $transFields = ['name', 'description', 'seo_title', 'seo_description', 'disclaimer'];
        foreach ($transFields as $field) {
            $translations = $request->input("translations.{$field}", []);
            if ($request->has($field)) {
                $translations['en'] = $request->input($field);
            }
            $category->setTranslations($field, $translations);
        }
        $category->save();

        return redirect()->route('admin.categories.index')->with('success', 'Category updated successfully.');
    }

    /**
     * Удаляет иконку у категории.
     */
    public function removeIcon(Category $category)
    {
        // Удаляем файл из storage, если существует
        if ($category->icon && \Storage::disk('public')->exists($category->icon)) {
            \Storage::disk('public')->delete($category->icon);
        }

        $category->icon = null;
        $category->save();

        // Возврат ответа (JSON или redirect)
        return request()->expectsJson()
            ? response()->json(['success' => true])
            : redirect()->route('admin.categories.edit', $category)->with('success', 'Icon removed successfully.');
    }

    /**
     * Удаляет категорию полностью.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return request()->expectsJson()
            ? response()->json(['success' => true])
            : redirect()->route('admin.categories.index')->with('success', 'Category deleted successfully.');
    }
}