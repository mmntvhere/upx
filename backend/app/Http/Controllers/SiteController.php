<?php

namespace App\Http\Controllers;

use App\Models\Site;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class SiteController extends Controller
{
    private array $supportedLanguages = [
        'en' => 'English',
        'uk' => 'Українська',
        'fr' => 'Français',
        'de' => 'Deutsch',
        'es' => 'Español',
        'it' => 'Italiano',
        'pt' => 'Português',
        'pl' => 'Polski',
        'nl' => 'Nederlands',
        'ru' => 'Русский',
        'tr' => 'Türkçe',
        'ro' => 'Română',
        'sv' => 'Svenska',
        'fi' => 'Suomi',
        'no' => 'Norsk',
        'da' => 'Dansk',
        'cs' => 'Čeština',
        'hu' => 'Magyar',
        'el' => 'Ελληνικά',
        'he' => 'עברית',
        'hi' => 'हिन्दी',
        'id' => 'Bahasa Indonesia',
        'vi' => 'Tiếng Việt',
        'th' => 'ไทย',
        'ja' => '日本語',
        'ko' => '한국어',
        'zh' => '中文',
        'ar' => 'العربية',
    ];

    public function index(Request $request)
{
    $query = Site::query();

    $categoryId = $request->get('category_id');
    $language = $request->get('language');

    // 🔎 Если выбрана конкретная категория (не all)
    if (!empty($categoryId) && $categoryId !== 'all') {
        $query->where('category_id', $categoryId);

        // Если выбран язык — фильтруем и по нему
        if (!empty($language)) {
            $query->where(function ($q) use ($language) {
                $q->whereJsonContains('enabled_languages', $language)
                    ->orWhereNull('enabled_languages')
                    ->orWhere('enabled_languages', '[]');
            });
        } else {
            // Язык не выбран — показываем только universal
            $query->where(function ($q) {
                $q->whereNull('enabled_languages')
                    ->orWhere('enabled_languages', '[]');
            });
        }
    }
    // ❗ Если категория all или не выбрана — ничего не фильтруем вообще

    return view('admin.sites.index', [
        'sites' => $query->orderBy('position')->paginate(20),
        'categories' => \App\Models\Category::all(),
        'categoryId' => $categoryId,
        'language' => $language,
        'languages' => $this->supportedLanguages,
    ]);
}

   // 💾 Сохранение нового сайта
public function store(Request $request)
{
    // ✅ Валидация полей
    $validated = $request->validate([
        'name'        => 'required|string|max:255',
        'slug'        => 'nullable|string|max:255',
        'description' => 'nullable|string',
        'review'      => 'nullable|string',
        'rating'      => 'required|numeric|min:0|max:10',
        'preview'     => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        'favicon'     => 'nullable|image|mimes:jpeg,png,jpg,ico,webp|max:1024',
        'main_image'  => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
        'pros'        => 'nullable|string',
        'cons'        => 'nullable|string',
        'link'        => 'required|url',
        'category_id' => 'nullable|exists:categories,id',
        'seo_title'   => 'nullable|string|max:255',
        'seo_description' => 'nullable|string',

        // 🌍 Массив включённых языков
        'enabled_languages' => ['nullable', 'array'],
        'enabled_languages.*' => ['in:en,uk,fr,de,es,it,pt,pl,nl,ru,tr,ro,sv,fi,no,da,cs,hu,el,he,hi,id,vi,th,ja,ko,zh,ar'],
    ]);

    // 🔘 Чекбокс is_active → всегда bool
    $validated['is_active'] = $request->boolean('is_active');

    // 🌀 Генерируем slug, если не указан
    $validated['slug'] = $this->generateUniqueSlug($validated['slug'] ?? $validated['name']);

    // 🖼️ Обработка изображений (если переданы)
    $validated = $this->handleImages($request, $validated);

    // 🌐 Языки: если ничего не выбрано — значит сайт универсален (null)
    $validated['enabled_languages'] = $request->filled('enabled_languages')
        ? array_values($request->input('enabled_languages'))
        : null;

    // 📦 Создание сайта
    $site = Site::create($validated);

    // 🌍 Сохраняем мультиязычные поля JSON-формата
    $fields = ['description', 'review', 'seo_title', 'seo_description', 'pros', 'cons'];
    foreach ($fields as $field) {
        $translations = $request->input("translations.{$field}", []);
        if ($request->filled($field)) {
            $translations['en'] = $request->input($field);
        }
        $site->setTranslations($field, $translations);
    }
    $site->save(); 

    // 🏷️ Привязка тегов (создаём если строка)
    $tagIds = collect($request->input('tags', []))->map(function ($tag) {
        if (is_numeric($tag)) return (int) $tag;

        $newTag = Tag::firstOrCreate(
            ['slug' => Str::slug($tag)],
            ['name' => $tag]
        );
        return $newTag->id;
    })->toArray();

    $site->tags()->sync($tagIds);

    // ✅ Успешный редирект
    return redirect()->route('admin.sites.index')->with('success', 'Сайт успешно добавлен!');
}

    // 📝 Страница редактирования
    public function edit(Site $site)
    {
        return view('admin.sites.edit', [
            'site' => $site,
            'categories' => \App\Models\Category::all(),
            'allTags' => Tag::all(),
            'languages' => $this->supportedLanguages,
            'enabledLanguages' => $site->enabled_languages, // null означает "на всех языках"
        ]);
    }

    public function update(Request $request, Site $site)
{
    // ✅ Валидация входящих данных
    $validated = $request->validate([
        'name'        => 'required|string|max:255',
        'slug'        => 'nullable|string|max:255|unique:sites,slug,' . $site->id,
        'description' => 'nullable|string',
        'review'      => 'nullable|string',
        'rating'      => 'nullable|numeric|min:0|max:10',
        'preview'     => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        'favicon'     => 'nullable|image|mimes:jpeg,png,jpg,ico,webp|max:1024',
        'main_image'  => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
        'pros'        => 'nullable|string',
        'cons'        => 'nullable|string',
        'link'        => 'required|url|max:255',
        'is_active'   => 'nullable|boolean',
        'category_id' => 'nullable|exists:categories,id',
        'seo_title'   => 'nullable|string|max:255',
        'seo_description' => 'nullable|string',
        'enabled_languages' => ['nullable', 'array'],
        'enabled_languages.*' => ['in:en,uk,fr,de,es,it,pt,pl,nl,ru,tr,ro,sv,fi,no,da,cs,hu,el,he,hi,id,vi,th,ja,ko,zh,ar'],
    ]);

    // ✅ Логика поля is_active
    $validated['is_active'] = $request->boolean('is_active');

    // ✅ Генерация slug, если не указан
    $validated['slug'] = $validated['slug'] ?? $this->generateUniqueSlug($validated['name'], $site->id);

    // ✅ Обработка изображений (preview, favicon, main_image)
    $validated = $this->handleImages($request, $validated, $site);

    // ✅ Обработка языков: если массив пустой — показывать везде (null)
    $validated['enabled_languages'] = $request->filled('enabled_languages')
        ? array_values($request->input('enabled_languages'))
        : null;

    // 💾 Обновляем базовые поля
    $site->update($validated);

    // 🌍 Обновляем JSON-поля переводов
    $fields = ['description', 'review', 'seo_title', 'seo_description', 'pros', 'cons'];
    foreach ($fields as $field) {
        $translations = $request->input("translations.{$field}", []);
        if ($request->has($field)) {
            $translations['en'] = $request->input($field);
        }
        $site->setTranslations($field, $translations);
    }
    $site->save();

    // 🏷️ Обновляем теги
    $tagIds = collect($request->input('tags', []))->map(function ($tag) {
        if (is_numeric($tag)) return (int) $tag;
        $newTag = Tag::firstOrCreate(
            ['slug' => Str::slug($tag)],
            ['name' => $tag]
        );
        return $newTag->id;
    })->toArray();
    $site->tags()->sync($tagIds);

    return redirect()->route('admin.sites.index')->with('success', 'Сайт успешно обновлён!');
}

public function create()
{
    return view('admin.sites.create', [
        'categories' => \App\Models\Category::all(),
        'allTags' => \App\Models\Tag::all(),
        'languages' => $this->supportedLanguages,
    ]);
}

    // 🗑️ Удаление изображений
    public function removeImage(Site $site, $field)
    {
        $allowed = ['preview', 'favicon', 'main_image'];

        if (!in_array($field, $allowed)) {
            return response()->json(['message' => 'Invalid image field.'], 400);
        }

        if ($site->$field && Storage::disk('public')->exists($site->$field)) {
            Storage::disk('public')->delete($site->$field);
            $site->$field = null;
            $site->save();
        } else {
            return response()->json(['message' => 'No image found.'], 422);
        }

        return response()->json(['message' => 'Image removed']);
    }

    // 🗑️ Удаление сайта
    public function destroy(Site $site)
    {
        foreach (['preview', 'favicon', 'main_image'] as $field) {
            if ($site->$field && Storage::disk('public')->exists($site->$field)) {
                Storage::disk('public')->delete($site->$field);
            }
        }

        $site->delete();

        return request()->expectsJson()
            ? response()->json(['success' => true])
            : redirect()->route('admin.sites.index')->with('success', 'Сайт удалён успешно.');
    }

    // 🔤 Генерация уникального slug
    private function generateUniqueSlug(string $name, $ignoreId = null): string
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $counter = 1;

        while (Site::where('slug', $slug)->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId))->exists()) {
            $slug = $baseSlug . '-' . $counter++;
        }

        return $slug;
    }

    // 🖼️ Загрузка и обновление изображений
    private function handleImages(Request $request, array $validated, ?Site $site = null): array
    {
        foreach (['preview', 'favicon', 'main_image'] as $field) {
            if ($request->hasFile($field)) {
                if ($site && $site->$field && Storage::disk('public')->exists($site->$field)) {
                    Storage::disk('public')->delete($site->$field);
                }

                $validated[$field] = $request->file($field)->store("sites/{$field}s", 'public');
            }
        }

        return $validated;
    }

    // 📦 API: получение сайта по slug со связанными сущностями
    public function showBySlug($slug)
    {
        $locale = request()->header('Accept-Language', 'en');

        $site = Site::with([
            'category.sites' => function ($query) use ($slug, $locale) {
                $query->where('slug', '!=', $slug)
                      ->where('is_active', true)
                      ->where(function ($q) use ($locale) {
                          $q->whereJsonContains('enabled_languages', $locale)
                            ->orWhereNull('enabled_languages')
                            ->orWhere('enabled_languages', '[]');
                      })
                      ->orderBy('position');
            },
            'tags'
        ])->where('slug', $slug)->firstOrFail();

        // 📎 Необходимые SEO-категории (как и раньше, для перелинковки)
        $site->allCategories = \App\Models\Category::with(['sites' => function ($query) use ($locale) {
            $query->whereNotNull('favicon')
                  ->where('is_active', true)
                  ->where(function ($q) use ($locale) {
                      $q->whereJsonContains('enabled_languages', $locale)
                        ->orWhereNull('enabled_languages')
                        ->orWhere('enabled_languages', '[]');
                  })
                  ->orderBy('position')
                  ->limit(5);
        }])->get();

        return new \App\Http\Resources\SiteResource($site);
    }
}