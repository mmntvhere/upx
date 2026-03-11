<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Отображает список страниц.
     */
    public function index(Request $request)
    {
        // ✅ Защита от SQL-инъекций
        $allowedSort = ['id', 'title', 'slug', 'position', 'is_active'];
        $sort = $request->get('sort', 'id');
        if (!in_array($sort, $allowedSort)) {
            $sort = 'id';
        }

        $direction = strtolower($request->get('direction', 'asc')) === 'desc' ? 'desc' : 'asc';

        $pages = \App\Models\Page::orderBy($sort, $direction)->paginate(10);

        return view('admin.pages.index', compact('pages', 'sort', 'direction'));
    }

    /**
     * Форма создания новой страницы.
     */
    public function create()
    {
        return view('admin.pages.create');
    }

    /**
     * Сохраняет новую страницу с мультиязычными полями.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'            => 'required|string|max:255',
            'slug'             => 'nullable|string|max:255|unique:pages,slug',
            'seo_title'        => 'nullable|string|max:255',
            'seo_description'  => 'nullable|string',
            'content'          => 'required|string',
            'position'         => 'nullable|integer',
        ]);

        $validated['slug'] = $validated['slug'] ?? \Illuminate\Support\Str::slug($validated['title']);
        $validated['is_active'] = $request->boolean('is_active');
        $validated['position'] = $validated['position'] ?? 0;

        $page = \App\Models\Page::create($validated);

        $transFields = ['title', 'content', 'seo_title', 'seo_description'];
        foreach ($transFields as $field) {
            $translations = $request->input("translations.{$field}", []);
            if ($request->filled($field)) {
                $translations['en'] = $request->input($field);
            }
            $page->setTranslations($field, $translations);
        }
        $page->save();

        return redirect()->route('admin.pages.index')->with('success', 'Page created successfully.');
    }

    /**
     * Форма редактирования страницы.
     */
    public function edit(\App\Models\Page $page)
    {
        return view('admin.pages.edit', compact('page'));
    }

    /**
     * Обновление страницы, включая мультиязычные поля.
     */
    public function update(Request $request, \App\Models\Page $page)
    {
        $validated = $request->validate([
            'title'            => 'required|string|max:255',
            'slug'             => 'nullable|string|max:255|unique:pages,slug,' . $page->id,
            'seo_title'        => 'nullable|string|max:255',
            'seo_description'  => 'nullable|string',
            'content'          => 'required|string',
            'position'         => 'nullable|integer',
        ]);

        $validated['slug'] = $validated['slug'] ?? \Illuminate\Support\Str::slug($validated['title']);
        $validated['is_active'] = $request->boolean('is_active');
        $validated['position'] = $validated['position'] ?? 0;

        $page->update($validated);

        $transFields = ['title', 'content', 'seo_title', 'seo_description'];
        foreach ($transFields as $field) {
            $translations = $request->input("translations.{$field}", []);
            if ($request->has($field)) {
                $translations['en'] = $request->input($field);
            }
            $page->setTranslations($field, $translations);
        }
        $page->save();

        return redirect()->route('admin.pages.index')->with('success', 'Page updated successfully.');
    }

    /**
     * Удаляет страницу.
     */
    public function destroy(\App\Models\Page $page)
    {
        $page->delete();
        return redirect()->route('admin.pages.index')->with('success', 'Page deleted successfully.');
    }
}
