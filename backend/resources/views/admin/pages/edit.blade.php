@extends('layouts.admin')

@section('breadcrumbs')
    <x-admin.breadcrumbs :items="[
        ['label' => 'Pages', 'url' => route('admin.pages.index')],
        ['label' => 'Edit Page: ' . $page->title]
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
    <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Edit Page: {{ $page->getTranslation('title', 'en') }}</h1>
    </div>

    @if (session('success'))
        <div class="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-md">
            {{ session('success') }}
        </div>
    @endif

    <form action="{{ route('admin.pages.update', $page) }}" method="POST"
          class="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        @csrf
        @method('PUT')

        {{-- Заголовок --}}
        <div>
            <label class="block text-sm font-medium mb-1" for="title">Title (English Menu Name)</label>
            <input type="text" name="title" id="title" value="{{ old('title', $page->getTranslation('title', 'en')) }}"
                   class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white"
                   required>
            @error('title')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- Slug --}}
        <div>
            <label class="block text-sm font-medium mb-1" for="slug">Slug (URL Path)</label>
            <input type="text" name="slug" id="slug" value="{{ old('slug', $page->slug) }}"
                   class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white">
            @error('slug')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- Контент --}}
        <div>
            <label class="block text-sm font-medium mb-1" for="content">Page Content (English)</label>
            <textarea name="content" id="content" rows="10"
                      class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white">{{ old('content', $page->getTranslation('content', 'en')) }}</textarea>
            @error('content')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- Иные поля --}}
        <div class="flex gap-4">
            <div class="flex items-center mt-4">
                <input type="checkbox" name="is_active" id="is_active" value="1" {{ old('is_active', $page->is_active) ? 'checked' : '' }}
                       class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                <label for="is_active" class="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Active
                </label>
            </div>
            
            <div class="flex-1">
                <label class="block text-sm font-medium mb-1" for="position">Sidebar Ranking Position</label>
                <input type="number" name="position" id="position" value="{{ old('position', $page->position) }}"
                       class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white">
            </div>
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
                    {{-- Title --}}
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Title ({{ $label }})
                        </label>
                        <input type="text" name="translations[title][{{ $locale }}]"
                               value="{{ old("translations.title.$locale", $page->getTranslation('title', $locale, false)) }}"
                               class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">
                    </div>

                    {{-- Content --}}
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Content ({{ $label }})
                        </label>
                        <textarea name="translations[content][{{ $locale }}]" rows="6"
                                  class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("translations.content.$locale", $page->getTranslation('content', $locale, false)) }}</textarea>
                    </div>

                    {{-- SEO Title --}}
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            SEO Title ({{ $label }})
                        </label>
                        <input type="text" name="translations[seo_title][{{ $locale }}]"
                               value="{{ old("translations.seo_title.$locale", $page->getTranslation('seo_title', $locale, false)) }}"
                               class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">
                    </div>

                    {{-- SEO Content --}}
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            SEO Description ({{ $label }})
                        </label>
                        <textarea name="translations[seo_description][{{ $locale }}]" rows="2"
                                  class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("translations.seo_description.$locale", $page->getTranslation('seo_description', $locale, false)) }}</textarea>
                    </div>
                </div>
            </div>
        @endforeach
        </div>

        {{-- Кнопки действий --}}
        <div class="flex space-x-2 pt-4">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md">Update Page</button>
            <a href="{{ route('admin.pages.index') }}" class="text-gray-500 hover:text-gray-700 border border-gray-300 px-4 py-2 rounded-md">Cancel</a>
        </div>
    </form>
@endsection
