@extends('layouts.admin')

@section('breadcrumbs')
    <x-admin.breadcrumbs :items="[
        ['label' => 'Categories', 'url' => route('admin.categories.index')],
        ['label' => 'Add Category']
    ]" />
@endsection

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

        {{-- Активность --}}
        <div class="flex items-center">
            <input type="checkbox" name="is_active" id="is_active"
                   class="mr-2" {{ old('is_active', true) ? 'checked' : '' }}>
            <label for="is_active">Active</label>
        </div>

        {{-- Кнопки действий --}}
        <div class="flex space-x-2">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
            <a href="{{ route('admin.categories.index') }}" class="text-gray-500 hover:text-gray-700">Cancel</a>
        </div>
    </form>
@endsection