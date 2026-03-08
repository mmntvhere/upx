@extends('layouts.admin')

@section('breadcrumbs')
    <x-admin.breadcrumbs :items="[
        ['label' => 'Tags', 'url' => route('admin.tags.index')],
        ['label' => 'Add Tag']
    ]" />
@endsection

@section('content')
    <h1 class="text-2xl font-bold mb-4">Add Tag</h1>

    <form method="POST" action="{{ route('admin.tags.store') }}"
          class="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        @csrf

        {{-- Name --}}
        <div>
            <label for="name" class="block text-sm font-medium mb-1">Tag Name</label>
            <input type="text" name="name" id="name" value="{{ old('name') }}" required
                   class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        </div>

        {{-- Slug --}}
        <div>
            <label for="slug" class="block text-sm font-medium mb-1">Slug (optional)</label>
            <input type="text" name="slug" id="slug" value="{{ old('slug') }}"
                   class="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white">
        </div>

        {{-- Submit --}}
        <div>
            <button type="submit"
                    class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Save
            </button>
            <a href="{{ route('admin.tags.index') }}" class="text-gray-500 hover:underline ml-2">Cancel</a>
        </div>
    </form>
@endsection
