@extends('layouts.admin')

@section('breadcrumbs')
    <x-admin.breadcrumbs :items="[
        ['label' => 'Categories', 'url' => route('admin.categories.index')],
        ['label' => 'Add Category']
    ]" />
@endsection

@push('scripts')
<script>
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

@section('content')
    <h1 class="text-2xl font-bold mb-4">Add Category</h1>

    {{-- enctype обязательно для загрузки файлов --}}
    <form action="{{ route('admin.categories.store') }}" method="POST" enctype="multipart/form-data"
          class="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        @csrf

        {{-- Название категории --}}
        <div>
            <label class="block text-sm font-medium mb-1" for="name">Name</label>
            <input type="text" name="name" id="name" value="{{ old('name') }}"
                   class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white"
                   required>
            @error('name')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- Slug (можно оставить пустым — сгенерируется автоматически) --}}
        <div>
            <label class="block text-sm font-medium mb-1" for="slug">Slug</label>
            <input type="text" name="slug" id="slug" value="{{ old('slug') }}"
                   class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white">
            @error('slug')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- ✅ SEO Title --}}
        <div>
            <label class="block text-sm font-medium mb-1" for="seo_title">SEO Title</label>
            <input type="text" name="seo_title" id="seo_title" value="{{ old('seo_title') }}"
                   class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white">
            @error('seo_title')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>
        <!-- SEO Description -->
<div class="mb-4">
  <label for="seo_description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
    SEO Description
  </label>
  <textarea
    name="seo_description"
    id="seo_description"
    rows="3"
    class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
  >{{ old('seo_description') }}</textarea>
</div>

        {{-- Описание --}}
        <div>
            <label class="block text-sm font-medium mb-1" for="description">Description</label>
            <textarea name="description" id="description" rows="3"
                      class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white">{{ old('description') }}</textarea>
            @error('description')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- Иконка (изображение) --}}
        <div>
            <label class="block text-sm font-medium mb-1" for="icon">Icon</label>
            <input type="file" name="icon" id="icon"
                   class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white"
                   accept="image/*">
            @error('icon')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- Дисклеймер --}}
        <div>
            <label class="block text-sm font-medium mb-1" for="disclaimer">Disclaimer</label>
            <textarea name="disclaimer" id="disclaimer" rows="3"
                      class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white">{{ old('disclaimer') }}</textarea>
            @error('disclaimer')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- 🌍 Трансляции --}}
@php
    $locales = collect(config('locales'))->except('en'); // убрать EN
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
            {{-- Name --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name ({{ $label }})
                </label>
                <input type="text" name="translations[name][{{ $locale }}]"
                       value="{{ old("translations.name.$locale") }}"
                       class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">
            </div>

            {{-- Description --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description ({{ $label }})
                </label>
                <textarea name="translations[description][{{ $locale }}]" rows="2"
                          class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("translations.description.$locale") }}</textarea>
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

            {{-- Disclaimer --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Disclaimer ({{ $label }})
                </label>
                <textarea name="translations[disclaimer][{{ $locale }}]" rows="2"
                          class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("translations.disclaimer.$locale") }}</textarea>
            </div>
        </div>
    </div>
@endforeach
</div>

        {{-- Кнопки действий --}}
        <div class="flex space-x-2">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
            <a href="{{ route('admin.categories.index') }}" class="text-gray-500 hover:text-gray-700">Cancel</a>
        </div>
    </form>
@endsection