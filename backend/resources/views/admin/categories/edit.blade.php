@extends('layouts.admin')

@section('breadcrumbs')
    <x-admin.breadcrumbs :items="[
        ['label' => 'Categories', 'url' => route('admin.categories.index')],
        ['label' => 'Edit Category']
    ]" />
@endsection

@section('content')
    <h1 class="text-2xl font-bold mb-4">Edit Category</h1>

    <form action="{{ route('admin.categories.update', $category) }}" method="POST" enctype="multipart/form-data"
          class="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        @csrf
        @method('PUT')

        {{-- Название --}}
        <div>
            <label class="block text-sm font-medium mb-1" for="name">Name</label>
            <input type="text" name="name" id="name" value="{{ old('name', $category->name) }}"
                   class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white"
                   required>
            @error('name')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- Slug --}}
        <div>
            <label class="block text-sm font-medium mb-1" for="slug">Slug</label>
            <input type="text" name="slug" id="slug" value="{{ old('slug', $category->slug) }}"
                   class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white">
            @error('slug')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- SEO Title --}}
        <div>
            <label class="block text-sm font-medium mb-1" for="seo_title">SEO Title</label>
            <input type="text" name="seo_title" id="seo_title" value="{{ old('seo_title', $category->seo_title) }}"
                   class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white">
            @error('seo_title')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- SEO Description --}}
        <div>
            <label for="seo_description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                SEO Description
            </label>
            <textarea name="seo_description" id="seo_description" rows="3"
                      class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">{{ old('seo_description', $category->seo_description) }}</textarea>
        </div>

        {{-- Описание --}}
        <div>
            <label class="block text-sm font-medium mb-1" for="description">Description</label>
            <textarea name="description" id="description" rows="3"
                      class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white">{{ old('description', $category->description) }}</textarea>
            @error('description')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- Иконка --}}
        <div>
            <label class="block text-sm font-medium mb-1" for="icon">Icon</label>
            @if($category->icon)
                <div class="mb-2">
                    <label class="block text-sm text-gray-700 dark:text-gray-300 mb-1">Current Icon</label>
                    <img src="{{ asset('storage/' . $category->icon) }}" alt="Icon" class="w-12 h-12 object-contain rounded">
                </div>
            @endif
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
                      class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-white">{{ old('disclaimer', $category->disclaimer) }}</textarea>
            @error('disclaimer')
                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        {{-- Активность --}}
        <div class="flex items-center">
            <input type="checkbox" name="is_active" id="is_active" class="mr-2"
                   {{ old('is_active', $category->is_active) ? 'checked' : '' }}>
            <label for="is_active">Active</label>
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
        <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-lg text-gray-800 dark:text-white">Translating to: {{ $label }}</h3>
            <button type="button" 
                    onclick="magicTranslate('category', {{ $category->id }}, '{{ $locale }}')"
                    class="magic-translate-btn flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Magic AI Translate
            </button>
        </div>

        <div class="space-y-4">
            {{-- Name --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name ({{ $label }})
                </label>
                <input type="text" name="translations[name][{{ $locale }}]"
                       data-field="name"
                       value="{{ old("translations.name.$locale", $category->getTranslation('name', $locale, false)) }}"
                       class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">
            </div>

            {{-- Description --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description ({{ $label }})
                </label>
                <textarea name="translations[description][{{ $locale }}]" rows="2"
                          data-field="description"
                          class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("translations.description.$locale", $category->getTranslation('description', $locale, false)) }}</textarea>
            </div>

            {{-- SEO Title --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    SEO Title ({{ $label }})
                </label>
                <input type="text" name="translations[seo_title][{{ $locale }}]"
                       data-field="seo_title"
                       value="{{ old("translations.seo_title.$locale", $category->getTranslation('seo_title', $locale, false)) }}"
                       class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">
            </div>

            {{-- SEO Description --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    SEO Description ({{ $label }})
                </label>
                <textarea name="translations[seo_description][{{ $locale }}]" rows="2"
                          data-field="seo_description"
                          class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("translations.seo_description.$locale", $category->getTranslation('seo_description', $locale, false)) }}</textarea>
            </div>

            {{-- Disclaimer --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Disclaimer ({{ $label }})
                </label>
                <textarea name="translations[disclaimer][{{ $locale }}]" rows="2"
                          data-field="disclaimer"
                          class="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 dark:text-white">{{ old("translations.disclaimer.$locale", $category->getTranslation('disclaimer', $locale, false)) }}</textarea>
            </div>
        </div>
    </div>
@endforeach
</div>

        {{-- Кнопки --}}
        <div class="flex space-x-2">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
            <a href="{{ route('admin.categories.index') }}" class="text-gray-500 hover:text-gray-700">Cancel</a>
        </div>
    </form>
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

  async function magicTranslate(type, id, lang) {
      if(!confirm('Translate this language using AI? It will overwrite current data in this tab.')) return;

      const btn = event.currentTarget;
      const originalHtml = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<svg class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';

      try {
          const res = await fetch("{{ route('admin.translate.single') }}", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'X-CSRF-TOKEN': '{{ csrf_token() }}'
              },
              body: JSON.stringify({ 
                  model_type: type,
                  model_id: id,
                  target_lang: lang
              })
          });

          const data = await res.json();
          if (data.success) {
              // Находим блок этого языка
              const block = document.querySelector(`.translation-block[data-locale="${lang}"]`);
              if(block) {
                  // Обновляем все инпуты в этом блоке
                  Object.entries(data.translations).forEach(([field, value]) => {
                      const input = block.querySelector(`[data-field="${field}"]`);
                      if(input) input.value = value;
                  });
              }
              alert('✨ AI Translation successful!');
          } else {
              alert('Error: ' + data.message);
          }
      } catch (e) {
          alert('Network error or timeout.');
      } finally {
          btn.innerHTML = originalHtml;
          btn.disabled = false;
      }
  }
</script>
@endpush