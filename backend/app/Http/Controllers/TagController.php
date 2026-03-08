<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TagController extends Controller
{
    /**
     * 📄 Список тегов
     */
    public function index(Request $request)
{
    $sort = $request->get('sort', 'id');          // По умолчанию сортировка по id
    $direction = $request->get('direction', 'asc'); // По умолчанию по возрастанию

    // Проверка допустимых полей для сортировки
    if (!in_array($sort, ['id', 'sites_count'])) {
        $sort = 'id';
    }

    $tags = Tag::withCount('sites')
        ->orderBy($sort, $direction)
        ->paginate(10)
        ->appends(['sort' => $sort, 'direction' => $direction]); // Чтобы ссылки пагинации сохраняли сортировку

    return view('admin.tags.index', compact('tags', 'sort', 'direction'));
}


    /**
     * 📄 Форма добавления тега
     */
    public function create()
    {
        return view('admin.tags.create');
    }

    /**
     * 💾 Сохранение нового тега
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:tags,slug'
        ]);

        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['name']);

        Tag::create($validated);

        return redirect()->route('admin.tags.index')->with('success', 'Тег успешно добавлен!');
    }

    /**
     * 📄 Форма редактирования тега
     */
    public function edit(Tag $tag)
    {
        return view('admin.tags.edit', compact('tag'));
    }

    /**
     * 💾 Обновление тега
     */
    public function update(Request $request, Tag $tag)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:tags,slug,' . $tag->id
        ]);

        $validated['slug'] = $validated['slug'] ?: Str::slug($validated['name']);

        $tag->update($validated);

        return redirect()->route('admin.tags.index')->with('success', 'Тег обновлён!');
    }

    /**
     * 🗑 Удаление тега
     */
    public function destroy(Tag $tag)
    {
        $tag->sites()->detach();
        $tag->delete();

        return redirect()->route('admin.tags.index')->with('success', 'Тег удалён.');
    }
}
