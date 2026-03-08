@extends('layouts.admin')

@section('breadcrumbs')
    <x-admin.breadcrumbs :items="[
        ['label' => 'Sites', 'url' => route('admin.sites.index')],
        ['label' => 'Add Site']
    ]" />
@endsection

@section('content')
    <h1 class="text-2xl font-bold mb-4">Add Site</h1>

    @if (session('success'))
        <div class="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-md">
            {{ session('success') }}
        </div>
    @endif

    <form action="{{ route('admin.sites.store') }}" method="POST" enctype="multipart/form-data"
          class="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        @csrf

        {{-- Name --}}
        <div>
            <label for="name" class="block text-sm font-medium mb-1">Name</label>
            <input type="text" name="name" id="name" value="{{ old('name') }}"
                   class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white" required>
        </div>

        {{-- Slug --}}
        <div>
            <label for="slug" class="block text-sm font-medium mb-1">Slug</label>
            <input type="text" name="slug" id="slug" value="{{ old('slug') }}"
                   class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        </div>

        {{-- Description --}}
        <div>
            <label for="description" class="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" id="description" rows="3"
                      class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white">{{ old('description') }}</textarea>
        </div>

        {{-- Review --}}
        <div>
            <label for="review" class="block text-sm font-medium mb-1">Review</label>
            <textarea name="review" id="review" rows="8"
                      class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white">{{ old('review') }}</textarea>
        </div>

        {{-- Link --}}
        <div>
            <label for="link" class="block text-sm font-medium mb-1">Link</label>
            <input type="url" name="link" id="link" value="{{ old('link') }}"
                   class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        </div>

        {{-- Category --}}
        <div>
            <label for="category_id" class="block text-sm font-medium mb-1">Category</label>
            <select name="category_id" id="category_id"
                    class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white">
                <option value="">Select category</option>
                @foreach($categories as $category)
                    <option value="{{ $category->id }}"
                        {{ old('category_id') == $category->id ? 'selected' : '' }}>
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
                        {{ collect(old('tags'))->contains($tag->id) ? 'selected' : '' }}>
                        {{ $tag->name }}
                    </option>
                @endforeach
            </select>
        </div>

        {{-- Rating --}}
        <div>
            <label for="rating" class="block text-sm font-medium mb-1">Rating (0–10)</label>
            <input type="number" name="rating" step="0.1" min="0" max="10" id="rating" value="{{ old('rating') }}"
                   class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        </div>

        {{-- Preview Image --}}
        <div>
            <label class="block text-sm font-medium mb-1">Preview</label>
            <input type="file" name="preview" accept="image/*"
                   class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        </div>

        {{-- Favicon --}}
        <div>
            <label class="block text-sm font-medium mb-1">Favicon</label>
            <input type="file" name="favicon" accept="image/*"
                   class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        </div>

        {{-- Main Image --}}
        <div>
            <label class="block text-sm font-medium mb-1">Main Image</label>
            <input type="file" name="main_image" accept="image/*"
                   class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        </div>

        {{-- Pros --}}
        <div>
            <label for="pros" class="block text-sm font-medium mb-1">Pros</label>
            <textarea name="pros" id="pros" rows="3"
                      class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white">{{ old('pros') }}</textarea>
        </div>

        {{-- Cons --}}
        <div>
            <label for="cons" class="block text-sm font-medium mb-1">Cons</label>
            <textarea name="cons" id="cons" rows="3"
                      class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white">{{ old('cons') }}</textarea>
        </div>

        {{-- SEO Title --}}
        <div>
            <label for="seo_title" class="block text-sm font-medium mb-1">SEO Title</label>
            <input type="text" name="seo_title" id="seo_title"
                   value="{{ old('seo_title') }}"
                   class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        </div>

        {{-- SEO Description --}}
        <div>
            <label for="seo_description" class="block text-sm font-medium mb-1">SEO Description</label>
            <textarea name="seo_description" id="seo_description" rows="3"
                      class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white">{{ old('seo_description') }}</textarea>
        </div>

        {{-- 🌍 Language Availability --}}
<div class="mt-6 bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-300 dark:border-gray-700">
    <h2 class="text-lg font-semibold mb-2 text-gray-800 dark:text-white">🌐 Language Availability</h2>
    <p class="text-sm text-gray-600 mb-3 dark:text-gray-400">
        Отметьте языки, в которых этот сайт <strong>должен отображаться</strong>.<br>
        Если не выбрано ничего — сайт будет отображаться <strong>везде</strong>.
    </p>

    {{-- ✅ Обёртка для чекбоксов --}}
    <div class="space-y-3">
        {{-- Чекбокс "Показывать везде" --}}
        <label class="flex items-center space-x-2 text-sm text-gray-800 dark:text-white">
            <input
                type="checkbox"
                id="show_everywhere"
                {{ empty(old('enabled_languages', [])) ? 'checked' : '' }}
                onchange="toggleLanguageCheckboxes(this)"
                class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
            >
            <span>Показывать на всех языках</span>
        </label>

        {{-- Сетка языков --}}
        <div id="language-checkboxes" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            @foreach ($languages as $locale => $label)
                <label class="flex items-center space-x-2 text-sm text-gray-800 dark:text-white">
                    <input
                        type="checkbox"
                        name="enabled_languages[]"
                        value="{{ $locale }}"
                        {{ in_array($locale, old('enabled_languages', [])) ? 'checked' : '' }}
                        class="language-checkbox rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    >
                    <span>{{ $label }} ({{ strtoupper($locale) }})</span>
                </label>
            @endforeach
        </div>
    </div>
</div>

        {{-- 🌍 Translations --}}
@php
    $locales = collect(config('locales'))->except('en');
@endphp

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
                <textarea name="translations[description][{{ $locale }}]" rows="2"
                          class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("translations.description.$locale") }}</textarea>
            </div>

            {{-- Review --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Review ({{ $label }})
                </label>
                <textarea name="translations[review][{{ $locale }}]" rows="4"
                          class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("translations.review.$locale") }}</textarea>
            </div>

            {{-- Pros --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Pros ({{ $label }})
                </label>
                <textarea name="translations[pros][{{ $locale }}]" rows="2"
                          class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("translations.pros.$locale") }}</textarea>
            </div>

            {{-- Cons --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cons ({{ $label }})
                </label>
                <textarea name="translations[cons][{{ $locale }}]" rows="2"
                          class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("translations.cons.$locale") }}</textarea>
            </div>

            {{-- SEO Title --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    SEO Title ({{ $label }})
                </label>
                <input type="text" name="translations[seo_title][{{ $locale }}]"
                       value="{{ old("translations.seo_title.$locale") }}"
                       class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">
            </div>

            {{-- SEO Description --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    SEO Description ({{ $label }})
                </label>
                <textarea name="translations[seo_description][{{ $locale }}]" rows="2"
                          class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("translations.seo_description.$locale") }}</textarea>
            </div>
        </div>
    </div>
@endforeach
</div>

        {{-- Is Active --}}
        <div class="flex items-center">
            <input type="hidden" name="is_active" value="0">
            <input type="checkbox" name="is_active" id="is_active" value="1"
                {{ old('is_active', true) ? 'checked' : '' }} class="mr-2">
            <label for="is_active">Active</label>
        </div>

        {{-- Submit --}}
        <div class="flex space-x-2 pt-4">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Save
            </button>
            <a href="{{ route('admin.sites.index') }}" class="text-gray-500 hover:text-gray-700">Cancel</a>
        </div>
    </form>

    @push('styles')
        <link href="https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/css/tom-select.css" rel="stylesheet">
    @endpush

   @push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/js/tom-select.complete.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            new TomSelect('#tags', {
                plugins: ['remove_button'],
                create: true,
                persist: false,
                sortField: {
                    field: "text",
                    direction: "asc"
                }
            });

            // ✅ Логика переключения языков
            function toggleLanguageCheckboxes(masterCheckbox) {
                const checkboxes = document.querySelectorAll('.language-checkbox');
                if (masterCheckbox.checked) {
                    checkboxes.forEach(cb => cb.checked = false);
                }
            }

            window.toggleLanguageCheckboxes = toggleLanguageCheckboxes;

            document.querySelectorAll('.language-checkbox').forEach(cb => {
                cb.addEventListener('change', () => {
                    document.getElementById('show_everywhere').checked = false;
                });
            });

            // ✅ Логика переключения вкладок перевода
            const translationSelector = document.getElementById('translation-language-selector');
            const translationBlocks = document.querySelectorAll('.translation-block');
            
            function updateVisibleTranslation() {
                if (!translationSelector) return;
                const selected = translationSelector.value;
                translationBlocks.forEach(block => {
                    if(block.dataset.locale === selected) {
                        block.classList.remove('hidden');
                    } else {
                        block.classList.add('hidden');
                    }
                });
            }
            
            if (translationSelector) {
                translationSelector.addEventListener('change', updateVisibleTranslation);
                updateVisibleTranslation();
            }
        });
    </script>
@endpush
@endsection