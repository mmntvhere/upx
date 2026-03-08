@extends('layouts.admin')

@php use Illuminate\Support\Facades\Storage; @endphp

@section('breadcrumbs')
    <x-admin.breadcrumbs :items="[
        ['label' => 'Sites', 'url' => route('admin.sites.index')],
        ['label' => 'Edit Site']
    ]" />
@endsection

@section('content')
    <h1 class="text-2xl font-bold mb-4">Edit Site</h1>

    @if(session('success'))
        <div class="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-md">
            {{ session('success') }}
        </div>
    @endif

    <form action="{{ route('admin.sites.update', $site) }}" method="POST" enctype="multipart/form-data"
          class="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        @csrf
        @method('PUT')

        {{-- Название --}}
        <div>
            <label for="name" class="block text-sm font-medium mb-1">Name</label>
            <input type="text" name="name" id="name" value="{{ $site->name }}" required
                   class="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        </div>

        {{-- Slug --}}
        <div>
            <label for="slug" class="block text-sm font-medium mb-1">Slug</label>
            <input type="text" name="slug" id="slug" value="{{ $site->slug }}"
                   class="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        </div>

        {{-- Описание --}}
        <div>
            <label for="description" class="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" id="description" rows="3"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white">{{ $site->description }}</textarea>
        </div>

{{-- Обзор / Review --}}
<div>
    <label for="review" class="block text-sm font-medium mb-1">Review</label>
    <textarea name="review" id="review" rows="8"
              class="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white">{{ $site->review }}</textarea>
</div>

        {{-- Ссылка --}}
        <div>
            <label for="link" class="block text-sm font-medium mb-1">Link</label>
            <input type="url" name="link" id="link" value="{{ $site->link }}"
                   class="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        </div>

        {{-- Категория --}}
        <div>
            <label for="category_id" class="block text-sm font-medium mb-1">Category</label>
            <select name="category_id" id="category_id"
                    class="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white">
                <option value="">Select category</option>
                @foreach($categories as $category)
                    <option value="{{ $category->id }}"
                            {{ $site->category_id == $category->id ? 'selected' : '' }}>
                        {{ $category->name }}
                    </option>
                @endforeach
            </select>
        </div>
{{-- Tags --}}
<div>
    <label for="tags" class="block text-sm font-medium mb-1">Tags</label>
    <select name="tags[]" id="tags" multiple
            class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        @foreach($allTags as $tag)
            <option value="{{ $tag->id }}"
                {{ (collect(old('tags', isset($site) ? $site->tags->pluck('id')->toArray() : []))->contains($tag->id)) ? 'selected' : '' }}>
                {{ $tag->name }}
            </option>
        @endforeach
    </select>
</div>


        {{-- Рейтинг --}}
        <div>
            <label for="rating" class="block text-sm font-medium mb-1">Rating (0–10)</label>
            <input type="number" name="rating" id="rating" min="0" max="10" step="0.1"
                   value="{{ $site->rating }}"
                   class="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        </div>

        {{-- Preview --}}
        <div>
            <label class="block text-sm font-medium mb-1">Preview</label>
            @if ($site->preview && Storage::disk('public')->exists($site->preview))
                <div class="mb-2 flex items-center justify-between">
                    <img src="{{ asset('storage/' . $site->preview) }}" alt="Preview" class="h-16">
                    <button type="button" onclick="removeImage({{ $site->id }}, 'preview')" class="text-red-600 text-sm">Remove</button>
                </div>
            @endif
            <input type="file" name="preview" accept="image/*"
                   class="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        </div>

        {{-- Favicon --}}
        <div>
            <label class="block text-sm font-medium mb-1">Favicon</label>
            @if ($site->favicon && Storage::disk('public')->exists($site->favicon))
                <div class="mb-2 flex items-center justify-between">
                    <img src="{{ asset('storage/' . $site->favicon) }}" alt="Favicon" class="h-10">
                    <button type="button" onclick="removeImage({{ $site->id }}, 'favicon')" class="text-red-600 text-sm">Remove</button>
                </div>
            @endif
            <input type="file" name="favicon" accept="image/*"
                   class="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        </div>

        {{-- Main Image --}}
        <div>
            <label class="block text-sm font-medium mb-1">Main Image</label>
            @if ($site->main_image && Storage::disk('public')->exists($site->main_image))
                <div class="mb-2 flex items-center justify-between">
                    <img src="{{ asset('storage/' . $site->main_image) }}" alt="Main" class="h-20">
                    <button type="button" onclick="removeImage({{ $site->id }}, 'main_image')" class="text-red-600 text-sm">Remove</button>
                </div>
            @endif
            <input type="file" name="main_image" accept="image/*"
                   class="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        </div>

        {{-- Pros --}}
        <div>
            <label for="pros" class="block text-sm font-medium mb-1">Pros</label>
            <textarea name="pros" id="pros" rows="3"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white">{{ $site->pros }}</textarea>
        </div>

        {{-- Cons --}}
        <div>
            <label for="cons" class="block text-sm font-medium mb-1">Cons</label>
            <textarea name="cons" id="cons" rows="3"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white">{{ $site->cons }}</textarea>
        </div>

{{-- SEO Title --}}
<div>
    <label for="seo_title" class="block text-sm font-medium mb-1">SEO Title</label>
    <input type="text" name="seo_title" id="seo_title"
           value="{{ old('seo_title', $site->seo_title) }}"
           class="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white">
</div>

{{-- SEO Description --}}
<div>
    <label for="seo_description" class="block text-sm font-medium mb-1">SEO Description</label>
    <textarea name="seo_description" id="seo_description" rows="3"
              class="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-600 dark:text-white">{{ old('seo_description', $site->seo_description) }}</textarea>
</div>
        
        {{-- Статус --}}
        <div class="flex items-center">
            <input type="hidden" name="is_active" value="0">
            <input type="checkbox" name="is_active" id="is_active" value="1" {{ $site->is_active ? 'checked' : '' }}
                   class="mr-2">
            <label for="is_active">Active</label>
        </div>

{{-- 🌍 Translations --}}
@php
    $locales = collect(config('locales'))->except('en');
@endphp

{{-- 🌍 Language Availability --}}
<div class="mt-6">
    <h2 class="text-xl font-bold mb-2 text-gray-800 dark:text-white">🌐 Language Availability</h2>
    <p class="text-sm text-gray-500 mb-3 dark:text-gray-400">
        Отметьте языки, в которых этот сайт <strong>должен отображаться</strong>.
        Если не выбрано ничего — сайт будет отображаться <strong>везде</strong>.
    </p>

    {{-- ✅ "Везде" чекбокс --}}
    <label class="flex items-center space-x-2 mb-4 text-sm text-gray-800 dark:text-white">
        <input
            type="checkbox"
            id="show_everywhere"
{{ empty($enabledLanguages ?? []) ? 'checked' : '' }}            onchange="toggleAllLanguageCheckboxes(this)"
            class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
        >
        <span>Показывать на всех языках</span>
    </label>

    <div id="language-checkboxes" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        @foreach ($languages as $locale => $label)
            <label class="flex items-center space-x-2 text-sm text-gray-800 dark:text-white">
                <input
                    type="checkbox"
                    name="enabled_languages[]"
                    value="{{ $locale }}"
{{ in_array($locale, $enabledLanguages ?? []) ? 'checked' : '' }}                    class="language-checkbox rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                >
                <span>{{ $label }} ({{ strtoupper($locale) }})</span>
            </label>
        @endforeach
    </div>
</div>

{{-- JS: обработка логики "Везде" --}}
@push('scripts')
<script>
function toggleAllLanguageCheckboxes(masterCheckbox) {
    const checkboxes = document.querySelectorAll('.language-checkbox');

    if (masterCheckbox.checked) {
        checkboxes.forEach(cb => cb.checked = false);
    }
}
</script>
@endpush


<hr class="my-6">
<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
    <h2 class="text-xl font-bold text-gray-800 dark:text-white">🌍 Translations</h2>
    
    <div class="flex items-center space-x-2">
        <label for="translation-language-selector" class="text-sm font-medium text-gray-700 dark:text-gray-300">Edit Language:</label>
        <select id="translation-language-selector" class="px-3 py-2 border rounded-md bg-white dark:bg-gray-900 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            @foreach ($locales as $locale => $label)
                <option value="{{ $locale }}">🌐 {{ $label }} ({{ strtoupper($locale) }})</option>
            @endforeach
        </select>
    </div>
</div>

<div id="translations-container">
@foreach ($locales as $locale => $label)
    <div class="translation-block hidden bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md p-5 mb-4" data-locale="{{ $locale }}">
        <h3 class="font-bold text-lg mb-4 text-gray-800 dark:text-white">Translating to: {{ $label }}</h3>

        <div class="space-y-4">
            {{-- Description --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description ({{ $label }})
                </label>
                <textarea name="description_translations[{{ $locale }}]" rows="2"
                          class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("description_translations.$locale", $site->description_translations[$locale] ?? '') }}</textarea>
            </div>

            {{-- Review --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Review ({{ $label }})
                </label>
                <textarea name="review_translations[{{ $locale }}]" rows="4"
                          class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("review_translations.$locale", $site->review_translations[$locale] ?? '') }}</textarea>
            </div>

            {{-- Pros --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Pros ({{ $label }})
                </label>
                <textarea name="pros_translations[{{ $locale }}]" rows="2"
                          class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("pros_translations.$locale", $site->pros_translations[$locale] ?? '') }}</textarea>
            </div>

            {{-- Cons --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cons ({{ $label }})
                </label>
                <textarea name="cons_translations[{{ $locale }}]" rows="2"
                          class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("cons_translations.$locale", $site->cons_translations[$locale] ?? '') }}</textarea>
            </div>

            {{-- SEO Title --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    SEO Title ({{ $label }})
                </label>
                <input type="text" name="seo_title_translations[{{ $locale }}]"
                       value="{{ old("seo_title_translations.$locale", $site->seo_title_translations[$locale] ?? '') }}"
                       class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">
            </div>

            {{-- SEO Description --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    SEO Description ({{ $label }})
                </label>
                <textarea name="seo_description_translations[{{ $locale }}]" rows="2"
                          class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("seo_description_translations.$locale", $site->seo_description_translations[$locale] ?? '') }}</textarea>
            </div>
        </div>
    </div>
@endforeach
</div>

        
        {{-- Действия --}}
        <div class="flex justify-between items-center pt-4">
            <div class="space-x-2">
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md">Update</button>
                <a href="{{ route('admin.sites.index') }}" class="text-gray-500 hover:text-gray-700">Cancel</a>
            </div>
            <button type="button" onclick="deleteSite({{ $site->id }})"
                    class="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
        </div>
    </form>
@endsection

@push('styles')
    <link href="https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/css/tom-select.css" rel="stylesheet">
@endpush

@push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/js/tom-select.complete.min.js"></script>
    <script>
        new TomSelect('#tags', {
            plugins: ['remove_button'],
            create: true,
            persist: false,
            sortField: {
                field: "text",
                direction: "asc"
            }
        });
    </script>

    <script>
        function removeImage(siteId, field) {
            if (!confirm('Remove this image?')) return;

            fetch(`/admin/sites/${siteId}/remove-image/${field}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': '{{ csrf_token() }}',
                    'Accept': 'application/json'
                }
            }).then(res => res.ok ? location.reload() : alert('Failed to remove image.'));
        }

        function deleteSite(siteId) {
            if (!confirm('Are you sure you want to delete this site?')) return;

            fetch(`/admin/sites/${siteId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': '{{ csrf_token() }}',
                    'Accept': 'application/json'
                }
            }).then(res => res.ok ? window.location.href = '{{ route('admin.sites.index') }}' : alert('Failed to delete site.'));
        }
    </script>
    <script>
  function toggleLanguageCheckboxes(master) {
    const checkboxes = document.querySelectorAll('.language-checkbox');
    checkboxes.forEach(cb => cb.checked = false);
  }

  document.querySelectorAll('.language-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      document.getElementById('show_everywhere').checked = false;
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('translation-language-selector');
    const blocks = document.querySelectorAll('.translation-block');
    
    function updateVisibleTranslation() {
        if (!selector) return;
        const selected = selector.value;
        blocks.forEach(block => {
            if(block.dataset.locale === selected) {
                block.classList.remove('hidden');
            } else {
                block.classList.add('hidden');
            }
        });
    }
    
    if (selector) {
        selector.addEventListener('change', updateVisibleTranslation);
        updateVisibleTranslation();
    }
  });
</script>
@endpush
