@extends('layouts.admin')

@section('breadcrumbs')
    <x-admin.breadcrumbs :items="[
        ['label' => 'Banners']
    ]" />
@endsection

@section('content')
    <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Banners</h1>
        <a href="{{ route('admin.banners.create') }}" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
            + Add Banner
        </a>
    </div>

    @if (session('success'))
        <div class="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-md">
            {{ session('success') }}
        </div>
    @endif

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table class="min-w-full text-sm text-left whitespace-nowrap">
            <thead class="bg-gray-100 dark:bg-gray-700">
                <tr>
                    <th class="px-4 py-3">ID</th>
                    <th class="px-4 py-3">Preview</th>
                    <th class="px-4 py-3">Title</th>
                    <th class="px-4 py-3">Link</th>
                    <th class="px-4 py-3">Position</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($banners as $banner)
                    <tr class="border-t border-gray-200 dark:border-gray-600">
                        <td class="px-4 py-3">{{ $banner->id }}</td>
                        <td class="px-4 py-3">
                            <img src="{{ asset('storage/' . $banner->image) }}" class="h-12 w-auto object-cover rounded shadow-sm bg-gray-100" alt="Banner Preview">
                        </td>
                        <td class="px-4 py-3 font-medium">{{ $banner->title ?: '—' }}</td>
                        <td class="px-4 py-3">
                            <a href="{{ $banner->link }}" target="_blank" class="text-blue-500 hover:underline flex items-center gap-1">
                                Link
                                <i data-lucide="external-link" class="w-3 h-3"></i>
                            </a>
                        </td>
                        <td class="px-4 py-3">
                            <span class="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 dark:bg-gray-700">
                                {{ ucfirst(str_replace('_', ' ', $banner->position)) }}
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            @if ($banner->is_active)
                                <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                            @else
                                <span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Inactive</span>
                            @endif
                        </td>
                        <td class="px-4 py-3 space-x-2">
                            <a href="{{ route('admin.banners.edit', $banner) }}" class="text-blue-600 hover:text-blue-800 transition">Edit</a>
                            <form action="{{ route('admin.banners.destroy', $banner) }}" method="POST" class="inline" onsubmit="return confirm('Delete this banner?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-600 hover:text-red-800 transition">Delete</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7" class="px-4 py-8 text-center text-gray-500">
                            No banners found. Create one to get started!
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="mt-4">
        {{ $banners->links() }}
    </div>
@endsection
