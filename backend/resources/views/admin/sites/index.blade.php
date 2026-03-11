@extends('layouts.admin')

@section('content')
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
    <div>
        <h1 class="text-3xl font-extrabold tracking-tight">Сайты</h1>
        <p class="text-slate-400 text-sm mt-1">Управление обзорами, рейтингом и сортировкой</p>
    </div>
    <a href="{{ route('admin.sites.create') }}" class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/20">
        <i data-lucide="plus" class="w-5 h-5"></i>
        Добавить сайт
    </a>
</div>

{{-- 🔽 Premium Filter Section --}}
<div class="card-glass p-6 mb-8">
    <form method="GET" action="{{ route('admin.sites.index') }}" class="flex flex-col lg:flex-row items-end gap-6">
        <div class="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {{-- Категория --}}
            <div class="space-y-2">
                <label for="category_id" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Категория</label>
                <div class="relative">
                    <select name="category_id" id="category_id" 
                            class="w-full appearance-none bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 transition-all outline-none"
                            onchange="this.form.submit()">
                        <option value="all" {{ $categoryId == 'all' ? 'selected' : '' }}>— Все категории —</option>
                        @foreach ($categories as $category)
                            <option value="{{ $category->id }}" {{ $categoryId == $category->id ? 'selected' : '' }}>
                                {{ $category->name }}
                            </option>
                        @endforeach
                    </select>
                    <i data-lucide="chevron-down" class="absolute right-4 top-3.5 w-4 h-4 text-slate-500 pointer-events-none"></i>
                </div>
            </div>

            {{-- Язык --}}
            @if ($categoryId && $categoryId !== 'all')
                <div class="space-y-2 fade-in">
                    <label for="language" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Язык сортировки</label>
                    <div class="relative">
                        <select name="language" id="language" 
                                class="w-full appearance-none bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 transition-all outline-none"
                                onchange="this.form.submit()">
                            <option value="">Универсальный (English / Default)</option>
                            @foreach ($languages as $locale => $label)
                                <option value="{{ $locale }}" {{ request('language') == $locale ? 'selected' : '' }}>
                                    {{ $label }} ({{ strtoupper($locale) }})
                                </option>
                            @endforeach
                        </select>
                        <i data-lucide="chevron-down" class="absolute right-4 top-3.5 w-4 h-4 text-slate-500 pointer-events-none"></i>
                    </div>
                </div>
            @endif
        </div>
        
        @if(request()->anyFilled(['category_id', 'language']))
            <a href="{{ route('admin.sites.index') }}" class="px-4 py-3 text-sm font-bold text-slate-500 hover:text-white transition-colors">Сброс</a>
        @endif
    </form>
</div>

<div class="card-glass overflow-hidden shadow-2xl">
    <table class="w-full text-left border-collapse">
        <thead>
            <tr class="border-b border-white/5 bg-white/[0.02]">
                @if ($categoryId && $categoryId !== 'all')
                <th class="px-6 py-5 w-16"></th>
                @endif
                <th class="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Информация</th>
                <th class="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden md:table-cell">Категория</th>
                <th class="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Рейтинг</th>
                <th class="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Статус</th>
                <th class="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Действие</th>
            </tr>
        </thead>
        <tbody id="sortable-sites" class="divide-y divide-white/5">
            @forelse ($sites as $site)
                <tr data-id="{{ $site->id }}" class="group hover:bg-white/[0.02] transition-colors">
                    @if ($categoryId && $categoryId !== 'all')
                    <td class="px-6 py-4">
                        <div class="drag-handle cursor-move p-2 text-slate-600 hover:text-indigo-400 transition-colors">
                            <i data-lucide="grip-vertical" class="w-5 h-5"></i>
                        </div>
                    </td>
                    @endif
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                @if($site->preview)
                                    <img src="{{ asset('storage/' . $site->preview) }}" class="w-full h-full object-cover" alt="">
                                @else
                                    <i data-lucide="globe" class="w-5 h-5 text-slate-600"></i>
                                @endif
                            </div>
                            <div class="min-w-0">
                                <p class="font-bold text-white truncate group-hover:text-indigo-400 transition-colors">{{ $site->name }}</p>
                                <p class="text-[10px] text-slate-500 font-mono truncate">/{{ $site->slug }}</p>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 hidden md:table-cell">
                        <span class="text-xs font-medium text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                            {{ $site->category?->name ?? 'Без категории' }}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex flex-col items-center">
                            <span class="text-sm font-bold text-amber-400">{{ number_format($site->rating, 1) }}</span>
                            <div class="flex gap-0.5 mt-1">
                                @for($i=1; $i<=5; $i++)
                                    <div class="w-1 h-1 rounded-full {{ $i <= ($site->rating/2) ? 'bg-amber-400' : 'bg-slate-700' }}"></div>
                                @endfor
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex justify-center">
                            @if ($site->is_active)
                                <div class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            @else
                                <div class="w-2 h-2 rounded-full bg-slate-600"></div>
                            @endif
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-center justify-end gap-2 text-right">
                            <a href="{{ route('admin.sites.edit', $site) }}" 
                               class="p-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition-all border border-white/5">
                                <i data-lucide="edit-3" class="w-4 h-4"></i>
                            </a>
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" class="px-6 py-20 text-center">
                        <p class="text-slate-500">Сайты не найдены</p>
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>
</div>

<div class="mt-8">
    {{ $sites->appends(request()->query())->links() }}
</div>
@endsection

@push('scripts')
    @if ($categoryId && $categoryId !== 'all')
        <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>
        <script>
            const el = document.getElementById('sortable-sites');
            const currentLocale = '{{ request('language') ?? 'en' }}';

            new Sortable(el, {
                animation: 250,
                handle: '.drag-handle',
                ghostClass: 'bg-indigo-600/10',
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
                        body: JSON.stringify({ order, locale: currentLocale })
                    }).then(res => {
                        if (!res.ok) alert('Ошибка сохранения порядка!');
                    });
                }
            });
        </script>
    @endif
@endpush