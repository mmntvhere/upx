@extends('layouts.admin')

@section('content')
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
    <div>
        <h1 class="text-3xl font-extrabold tracking-tight">Статические страницы</h1>
        <p class="text-slate-400 text-sm mt-1">FAQ, Правила сообщества, Контакты и другие сервисные разделы</p>
    </div>
    <a href="{{ route('admin.pages.create') }}" class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/20">
        <i data-lucide="plus" class="w-5 h-5"></i>
        Создать страницу
    </a>
</div>

<div class="card-glass overflow-hidden shadow-2xl">
    <table class="w-full text-left border-collapse">
        <thead>
            <tr class="border-b border-white/5 bg-white/[0.02]">
                <th class="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">ID</th>
                <th class="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Заголовок</th>
                <th class="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Slug / Путь</th>
                <th class="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Статус</th>
                <th class="px-6 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Действия</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
            @forelse ($pages as $page)
                <tr class="group hover:bg-white/[0.02] transition-colors">
                    <td class="px-6 py-4">
                        <span class="text-xs font-mono text-slate-500">#{{ $page->id }}</span>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                <i data-lucide="file-text" class="w-5 h-5 text-indigo-400"></i>
                            </div>
                            <div>
                                <p class="font-bold text-white group-hover:text-indigo-400 transition-colors">{{ $page->getTranslation('title', 'en') }}</p>
                                <p class="text-[10px] text-slate-500">Позиция: {{ $page->position }}</p>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-slate-400 font-mono">/{{ $page->slug }}</td>
                    <td class="px-6 py-4">
                        <div class="flex justify-center">
                            @if ($page->is_active)
                                <div class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            @else
                                <div class="w-2 h-2 rounded-full bg-slate-600"></div>
                            @endif
                        </div>
                    </td>
                    <td class="px-6 py-4 text-right">
                        <div class="flex items-center justify-end gap-2">
                            <a href="{{ route('admin.pages.edit', $page) }}" 
                               class="p-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition-all border border-white/5">
                                <i data-lucide="edit-3" class="w-4 h-4"></i>
                            </a>
                            <form action="{{ route('admin.pages.destroy', $page) }}" method="POST" class="inline">
                                @csrf
                                @method('DELETE')
                                <button type="submit" 
                                        class="p-2 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-lg transition-all border border-red-500/10" 
                                        onclick="return confirm('Вы уверены? Это действие нельзя отменить.')">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="px-6 py-20 text-center">
                        <p class="text-slate-500">Страницы еще не созданы</p>
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>
</div>

<div class="mt-8">
    {{ $pages->appends(request()->query())->links() }}
</div>
@endsection
