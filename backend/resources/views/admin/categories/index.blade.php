@extends('layouts.admin')

@section('content')
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
    <div>
        <h1 class="text-3xl font-extrabold tracking-tight">Категории</h1>
        <p class="text-slate-400 text-sm mt-1">Управление разделами и типами контента</p>
    </div>
    <a href="{{ route('admin.categories.create') }}" class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/20">
        <i data-lucide="plus" class="w-5 h-5"></i>
        Добавить категорию
    </a>
</div>

<div class="card-glass overflow-hidden">
    <table class="w-full text-left border-collapse">
        <thead>
            <tr class="border-b border-white/5 bg-white/[0.02]">
                <th class="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">ID</th>
                <th class="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Название</th>
                <th class="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Slug / URL</th>
                <th class="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Статус</th>
                <th class="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Действия</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
            @forelse ($categories as $category)
                <tr class="group hover:bg-white/[0.02] transition-colors">
                    <td class="px-6 py-4">
                        <span class="text-xs font-mono text-slate-500">#{{ $category->id }}</span>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                @if($category->icon)
                                    <img src="{{ Storage::url($category->icon) }}" class="w-full h-full object-cover" alt="">
                                @else
                                    <i data-lucide="folder" class="w-5 h-5 text-slate-500"></i>
                                @endif
                            </div>
                            <div>
                                <p class="font-bold text-white group-hover:text-indigo-400 transition-colors">{{ $category->name }}</p>
                                <p class="text-[10px] text-slate-500">{{ $category->sites_count ?? $category->sites()->count() }} сайтов</p>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-slate-400 font-mono">/{{ $category->slug }}</td>
                    <td class="px-6 py-4">
                        <div class="flex justify-center">
                            @if ($category->is_active)
                                <span class="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-500/20">Active</span>
                            @else
                                <span class="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-[10px] font-bold border border-red-500/20">Inactive</span>
                            @endif
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-center justify-end gap-2">
                            <a href="{{ route('admin.categories.edit', $category) }}" 
                               class="p-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition-all border border-white/5"
                               title="Редактировать">
                                <i data-lucide="edit-3" class="w-4 h-4"></i>
                            </a>
                            <form action="{{ route('admin.categories.destroy', $category) }}" method="POST" class="inline">
                                @csrf
                                @method('DELETE')
                                <button type="submit" 
                                        class="p-2 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-lg transition-all border border-red-500/10" 
                                        onclick="return confirm('Вы уверены? Все связанные сайты останутся без категории.')"
                                        title="Удалить">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="px-6 py-20 text-center">
                        <div class="flex flex-col items-center">
                            <i data-lucide="search-x" class="w-12 h-12 text-slate-600 mb-4"></i>
                            <p class="text-slate-500 font-medium">Категории не найдены</p>
                            <a href="{{ route('admin.categories.create') }}" class="text-indigo-500 text-sm mt-2 hover:underline">Создать первую категорию</a>
                        </div>
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>
</div>
@endsection
