<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index()
    {
        return view('admin.categories.index', [
            'categories' => Category::all()
        ]);
    }

    public function create()
    {
        return view('admin.categories.create', [
            'locales' => collect(config('locales'))->except('en')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(\App\Http\Requests\StoreCategoryRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('icon')) {
            $data['icon'] = $request->file('icon')->store('categories', 'public');
        }

        $category = Category::create($data);
        $this->syncTranslations($category, $request);

        return redirect()->route('admin.categories.index')->with('success', 'Category created successfully.');
    }

    public function edit(Category $category)
    {
        return view('admin.categories.edit', compact('category'));
    }

    /**
     * Update the specified resource in storage (Senior-level implementation)
     */
    public function update(\App\Http\Requests\UpdateCategoryRequest $request, Category $category)
    {
        $data = $request->validated();

        // Обработка иконки
        if ($request->hasFile('icon')) {
            if ($category->icon) Storage::disk('public')->delete($category->icon);
            $data['icon'] = $request->file('icon')->store('categories', 'public');
        }

        $category->update($data);
        $this->syncTranslations($category, $request);

        return redirect()->route('admin.categories.index')->with('success', 'Category updated successfully.');
    }

    /**
     * Вспомогательный метод для синхронизации переводов
     */
    protected function syncTranslations(Category $category, Request $request)
    {
        if ($request->has('translations')) {
            foreach ($request->input('translations') as $field => $locales) {
                $category->setTranslations($field, $locales);
            }
            $category->save();
        }
    }

    public function removeIcon(Category $category)
    {
        if ($category->icon) {
            Storage::disk('public')->delete($category->icon);
            $category->update(['icon' => null]);
        }
        return response()->json(['success' => true]);
    }

    public function destroy(Category $category)
    {
        if ($category->icon) Storage::disk('public')->delete($category->icon);
        $category->delete();
        return redirect()->route('admin.categories.index')->with('success', 'Category deleted successfully.');
    }
}