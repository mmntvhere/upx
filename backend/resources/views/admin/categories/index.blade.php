@extends('layouts.admin')

@section('breadcrumbs')
    <x-admin.breadcrumbs :items="[
        ['label' => 'Categories']
    ]" />
@endsection

@section('content')
    <h1 class="text-2xl font-bold mb-4">Categories</h1>

    @if (session('success'))
        <div class="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-md">
            {{ session('success') }}
        </div>
    @endif

    <a href="{{ route('admin.categories.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 inline-block">
        + Add Category
    </a>

    @php
        $isAsc = request('direction', 'asc') === 'asc';
        $newDirection = $isAsc ? 'desc' : 'asc';
    @endphp

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table class="min-w-full text-sm text-left whitespace-nowrap">
            <thead class="bg-gray-100 dark:bg-gray-700">
                <tr>
                    <th class="px-4 py-2">
                        <a href="{{ route('admin.categories.index', ['sort' => 'id', 'direction' => $newDirection]) }}"
                           class="flex items-center space-x-1">
                            <span>ID</span>
                            @if (request('sort') === 'id')
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    @if ($isAsc)
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M5 15l7-7 7 7"/>
                                    @else
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M19 9l-7 7-7-7"/>
                                    @endif
                                </svg>
                            @endif
                        </a>
                    </th>
                    <th class="px-4 py-2">Name</th>
                    <th class="px-4 py-2">Slug</th>
                    <th class="px-4 py-2">Active</th>
                    <th class="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($categories as $category)
                    <tr class="border-t border-gray-200 dark:border-gray-600">
                        <td class="px-4 py-2">{{ $category->id }}</td>
                        <td class="px-4 py-2">{{ $category->name }}</td>
                        <td class="px-4 py-2">{{ $category->slug }}</td>
                        <td class="px-4 py-2">
                            @if ($category->is_active)
                                <span class="text-green-600">Yes</span>
                            @else
                                <span class="text-red-600">No</span>
                            @endif
                        </td>
                        <td class="px-4 py-2 space-x-2">
                            <a href="{{ route('admin.categories.edit', $category) }}" class="text-blue-600 hover:underline">Edit</a>
                            <form action="{{ route('admin.categories.destroy', $category) }}" method="POST" class="inline">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-600" onclick="return confirm('Delete this category?')">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="px-4 py-2 text-center text-gray-500">No categories found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="mt-4">
        {{ $categories->appends(request()->query())->links() }}
    </div>
@endsection
