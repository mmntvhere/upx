@extends('layouts.admin')

@section('breadcrumbs')
    <x-admin.breadcrumbs :items="[
        ['label' => 'Pages']
    ]" />
@endsection

@section('content')
    <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Pages (FAQ, Terms, etc.)</h1>
        <a href="{{ route('admin.pages.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded-md">
            + Add Page
        </a>
    </div>

    @if (session('success'))
        <div class="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-md">
            {{ session('success') }}
        </div>
    @endif

    @php
        $isAsc = request('direction', 'asc') === 'asc';
        $newDirection = $isAsc ? 'desc' : 'asc';
    @endphp

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table class="min-w-full text-sm text-left whitespace-nowrap">
            <thead class="bg-gray-100 dark:bg-gray-700">
                <tr>
                    <th class="px-4 py-2">
                        <a href="{{ route('admin.pages.index', ['sort' => 'id', 'direction' => $newDirection]) }}" class="flex items-center space-x-1">
                            <span>ID</span>
                        </a>
                    </th>
                    <th class="px-4 py-2">Title</th>
                    <th class="px-4 py-2">Slug</th>
                    <th class="px-4 py-2">Active</th>
                    <th class="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($pages as $page)
                    <tr class="border-t border-gray-200 dark:border-gray-600">
                        <td class="px-4 py-2">{{ $page->id }}</td>
                        <td class="px-4 py-2">{{ $page->title }}</td>
                        <td class="px-4 py-2">/{{ $page->slug }}</td>
                        <td class="px-4 py-2">
                            @if ($page->is_active)
                                <span class="text-green-600">Yes</span>
                            @else
                                <span class="text-red-600">No</span>
                            @endif
                        </td>
                        <td class="px-4 py-2 space-x-2">
                            <a href="{{ route('admin.pages.edit', $page) }}" class="text-blue-600 hover:underline">Edit</a>
                            <form action="{{ route('admin.pages.destroy', $page) }}" method="POST" class="inline">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-600" onclick="return confirm('Delete this page?')">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="px-4 py-2 text-center text-gray-500">No pages found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="mt-4">
        {{ $pages->appends(request()->query())->links() }}
    </div>
@endsection
