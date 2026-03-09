@extends('layouts.admin')

@section('breadcrumbs')
    <x-admin.breadcrumbs :items="[
        ['label' => 'Banners', 'url' => route('admin.banners.index')],
        ['label' => 'Create Banner']
    ]" />
@endsection

@section('content')
    <h1 class="text-2xl font-bold mb-6">Create New Banner</h1>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow max-w-2xl">
        <form action="{{ route('admin.banners.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
            @csrf

            <!-- Title -->
            <div>
                <label for="title" class="block text-sm font-medium mb-1">Title (Optional)</label>
                <input type="text" name="title" id="title" value="{{ old('title') }}" 
                       class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
                       placeholder="e.g. Summer Sale 2026">
                @error('title') <span class="text-red-500 text-sm">{{ $message }}</span> @enderror
            </div>

            <!-- Link -->
            <div>
                <label for="link" class="block text-sm font-medium mb-1">Target URL <span class="text-red-500">*</span></label>
                <input type="url" name="link" id="link" value="{{ old('link') }}" required 
                       class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
                       placeholder="https://example.com">
                @error('link') <span class="text-red-500 text-sm">{{ $message }}</span> @enderror
            </div>

            <!-- Position -->
            <div>
                <label for="position" class="block text-sm font-medium mb-1">Banner Position <span class="text-red-500">*</span></label>
                <select name="position" id="position" required class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2">
                    <option value="main" {{ old('position') == 'main' ? 'selected' : '' }}>Main Desktop Banner (Left)</option>
                    <option value="side_top" {{ old('position') == 'side_top' ? 'selected' : '' }}>Small Side Top (Right)</option>
                    <option value="side_bottom" {{ old('position') == 'side_bottom' ? 'selected' : '' }}>Small Side Bottom (Right)</option>
                </select>
                @error('position') <span class="text-red-500 text-sm">{{ $message }}</span> @enderror
                <p class="text-xs text-gray-500 mt-1">Note: The mobile version only displays the "Main" banner.</p>
            </div>

            <!-- Image Upload -->
            <div>
                <label for="image" class="block text-sm font-medium mb-1">Image <span class="text-red-500">*</span></label>
                <input type="file" name="image" id="image" required accept="image/*"
                       class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2">
                @error('image') <span class="text-red-500 text-sm">{{ $message }}</span> @enderror
            </div>

            <!-- Status -->
            <div class="flex items-center gap-2">
                <input type="hidden" name="is_active" value="0">
                <input type="checkbox" name="is_active" id="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }}
                       class="w-4 h-4 text-blue-600 rounded border-gray-300">
                <label for="is_active" class="text-sm font-medium">Banner is Active</label>
            </div>

            <!-- Submit -->
            <div class="pt-4 flex justify-end">
                <a href="{{ route('admin.banners.index') }}" class="px-4 py-2 text-gray-500 hover:text-gray-700 mr-4 transition">Cancel</a>
                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition">
                    Create Banner
                </button>
            </div>
        </form>
    </div>
@endsection
