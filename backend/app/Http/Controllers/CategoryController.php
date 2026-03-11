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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:categories',
            'description' => 'nullable|string',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,svg,webp,avif|max:2048',
            'disclaimer' => 'nullable|string',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['name']);

        if ($request->hasFile('icon')) {
            $validated['icon'] = $request->file('icon')->store('categories', 'public');
        }

        $category = Category::create($validated);

        // Translations handling
        foreach ($request->input('translations', []) as $field => $locales) {
            $category->setTranslations($field, $locales);
        }
        $category->save();

        return redirect()->route('admin.categories.index')->with('success', 'Category created successfully.');
    }

    public function edit(Category $category)
    {
        return view('admin.categories.edit', compact('category'));
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:categories,slug,' . $category->id,
            'description' => 'nullable|string',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,svg,webp,avif|max:2048',
            'disclaimer' => 'nullable|string',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
        ]);

        $validated['is_active'] = $request->boolean('is_active');
        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['name']);

        if ($request->hasFile('icon')) {
            if ($category->icon) Storage::disk('public')->delete($category->icon);
            $validated['icon'] = $request->file('icon')->store('categories', 'public');
        }

        $category->update($validated);

        // Translations update
        foreach ($request->input('translations', []) as $field => $locales) {
            $category->setTranslations($field, $locales);
        }
        $category->save();

        return redirect()->route('admin.categories.index')->with('success', 'Category updated successfully.');
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