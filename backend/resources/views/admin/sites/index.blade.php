@extends('layouts.admin')

@section('breadcrumbs')
    <x-admin.breadcrumbs :items="[
        ['label' => 'Sites']
    ]" />
@endsection

@section('content')
    <h1 class="text-2xl font-bold mb-4">Sites</h1>

    @if (session('success'))
        <div class="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-md">
            {{ session('success') }}
        </div>
    @endif

    <a href="{{ route('admin.sites.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 inline-block">
        + Add Site
    </a>

    {{-- 🔽 Фильтр по категориям и языкам --}}
<form method="GET" action="{{ route('admin.sites.index') }}" class="mb-4 flex flex-col sm:flex-row gap-4">
    {{-- Категория --}}
    <div>
        <label for="category_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filter by category:</label>
        <select name="category_id" id="category_id"
                class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
                onchange="this.form.submit()">
<option value="all" {{ $categoryId == 'all' ? 'selected' : '' }}>— All Categories —</option>            @foreach ($categories as $category)
                <option value="{{ $category->id }}" {{ $categoryId == $category->id ? 'selected' : '' }}>
                    {{ $category->name }}
                </option>
            @endforeach
        </select>
    </div>

    {{-- Язык (появляется только после выбора категории) --}}
    @if ($categoryId && $categoryId !== 'all')
        <div>
            <label for="language" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filter by language:</label>
            <select name="language" id="language"
                    class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
                    onchange="this.form.submit()">
                <option value="">Universal (all languages)</option>
                @foreach ($languages as $locale => $label)
                    <option value="{{ $locale }}" {{ request('language') == $locale ? 'selected' : '' }}>
                        {{ $label }} ({{ strtoupper($locale) }})
                    </option>
                @endforeach
            </select>
        </div>
    @endif
</form>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table class="min-w-full text-sm text-left whitespace-nowrap">
            <thead class="bg-gray-100 dark:bg-gray-700">
                <tr>
                    <th class="px-4 py-2">Sort</th>
                    <th class="px-4 py-2">ID</th>
                    <th class="px-4 py-2">Name</th>
                    <th class="px-4 py-2">Slug</th>
                    <th class="px-4 py-2">Rating</th>
                    <th class="px-4 py-2">Active</th>
                    <th class="px-4 py-2">Category</th>
                    <th class="px-4 py-2">Preview</th>
                    <th class="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody id="sortable-sites">
                @foreach ($sites as $site)
                    <tr data-id="{{ $site->id }}" class="border-t border-gray-200 dark:border-gray-600">
                        <td class="px-4 py-2 text-xl text-gray-400">
                            @if ($categoryId)
                                <span class="drag-handle cursor-move">≡</span>
                            @else
                                —
                            @endif
                        </td>
                        <td class="px-4 py-2">{{ $site->id }}</td>
                        <td class="px-4 py-2">{{ $site->name }}</td>
                        <td class="px-4 py-2">{{ $site->slug }}</td>
                        <td class="px-4 py-2">{{ number_format($site->rating, 1) }}/10</td>
                        <td class="px-4 py-2">
                            @if ($site->is_active)
                                <span class="text-green-600">Yes</span>
                            @else
                                <span class="text-red-600">No</span>
                            @endif
                        </td>
                        <td class="px-4 py-2">{{ $site->category?->name ?? '—' }}</td>
                        <td class="px-4 py-2">
                            @if ($site->preview)
                                <img src="{{ asset('storage/' . $site->preview) }}" alt="Preview" class="h-10">
                            @else
                                —
                            @endif
                        </td>
                        <td class="px-4 py-2 space-x-2">
                            <a href="{{ route('admin.sites.edit', $site) }}" class="text-blue-600 hover:underline">Edit</a>
                            <form action="{{ route('admin.sites.destroy', $site) }}" method="POST" class="inline"
                                  onsubmit="return confirm('Delete this site?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-600 hover:underline">Delete</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="mt-4">
        {{ $sites->appends(request()->query())->links() }}
    </div>
@endsection

@push('scripts')
    @if ($categoryId)
        <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>
        <script>
            const el = document.getElementById('sortable-sites');

            const currentLocale = '{{ request('language') ?? 'en' }}'; // 🔁 язык из фильтра

            new Sortable(el, {
                animation: 150,
                handle: '.drag-handle',
                onEnd: function () {
                    const order = Array.from(el.children).map((row, index) => ({
                        id: row.dataset.id,
                        position: index + 1
                    }));

                    fetch('{{ route('admin.sites.sort') }}', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': '{{ csrf_token() }}'
                        },
                        body: JSON.stringify({
                            order,
                            locale: currentLocale // ✅ вот оно
                        })
                    }).then(res => {
                        if (!res.ok) {
                            alert('Ошибка при сохранении порядка!');
                        }
                    });
                }
            });
        </script>
    @endif
@endpush