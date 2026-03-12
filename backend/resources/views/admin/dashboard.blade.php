@extends('layouts.admin')

@section('content')
<div class="space-y-8">
    <!-- 🚀 Hero Welcome Section -->
    <div class="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 p-10 text-white shadow-2xl">
        <div class="relative z-10">
            <h1 class="text-4xl font-extrabold tracking-tight mb-2">Добро пожаловать в BeInPorn, {{ Auth::user()->name ?? 'Admin' }}! ✨</h1>
            <p class="text-indigo-100 text-lg opacity-90 max-w-2xl">
                Ваша система управления контентом обновлена до премиальной версии. Все инструменты автоматизации и перевода теперь под рукой.
            </p>
        </div>
        <!-- Abstract Shapes -->
        <div class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 left-0 -ml-10 -mb-10 w-64 h-64 bg-black/10 rounded-full blur-2xl"></div>
    </div>

    <!-- 📊 Quick Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="card-glass p-6">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                    <i data-lucide="layers" class="w-6 h-6"></i>
                </div>
                <div>
                    <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Категории</p>
                    <h3 class="text-2xl font-bold">{{ \App\Models\Category::count() }}</h3>
                </div>
            </div>
        </div>

        <div class="card-glass p-6">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
                    <i data-lucide="monitor" class="w-6 h-6"></i>
                </div>
                <div>
                    <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Сайты</p>
                    <h3 class="text-2xl font-bold">{{ \App\Models\Site::count() }}</h3>
                </div>
            </div>
        </div>

        <div class="card-glass p-6">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500">
                    <i data-lucide="globe" class="w-6 h-6"></i>
                </div>
                <div>
                    <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Языков</p>
                    <h3 class="text-2xl font-bold">{{ count(config('languages.supported', [])) }}</h3>
                </div>
            </div>
        </div>

        <div class="card-glass p-6">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                    <i data-lucide="zap" class="w-6 h-6"></i>
                </div>
                <div>
                    <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Статус AI</p>
                    <h3 class="text-2xl font-bold text-emerald-400">Online</h3>
                </div>
            </div>
        </div>
    </div>

    <!-- 🛠️ Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="card-glass p-8">
            <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                <i data-lucide="plus-circle" class="w-5 h-5 text-indigo-500"></i>
                Быстрые действия
            </h2>
            <div class="grid grid-cols-2 gap-4">
                <a href="{{ route('admin.sites.create') }}" class="group bg-white/5 hover:bg-white/10 p-5 rounded-2xl transition-all border border-white/5">
                    <i data-lucide="monitor" class="w-8 h-8 text-blue-400 mb-3 transition-transform group-hover:scale-110"></i>
                    <p class="text-sm font-bold">Добавить сайт</p>
                    <p class="text-[10px] text-slate-400 mt-1">Новый обзор и SEO</p>
                </a>
                <a href="{{ route('admin.categories.create') }}" class="group bg-white/5 hover:bg-white/10 p-5 rounded-2xl transition-all border border-white/5">
                    <i data-lucide="folder-plus" class="w-8 h-8 text-purple-400 mb-3 transition-transform group-hover:scale-110"></i>
                    <p class="text-sm font-bold">Новая категория</p>
                    <p class="text-[10px] text-slate-400 mt-1">Классификация контента</p>
                </a>
            </div>
        </div>

        <div class="card-glass p-8 relative overflow-hidden group">
            <div class="relative z-10">
                <h2 class="text-xl font-bold mb-2">Перевод через AI</h2>
                <p class="text-sm text-slate-400 mb-6 max-w-xs">
                    Автоматически переведите все недостающие обзоры на 27 языков одним нажатием.
                </p>
                <a href="{{ route('admin.translate.form') }}" class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/20">
                    <i data-lucide="languages" class="w-5 h-5"></i>
                    Запустить переводчик
                </a>
            </div>
            <!-- BG Illustration -->
            <div class="absolute -right-10 -bottom-10 w-48 h-48 opacity-10 transition-transform group-hover:scale-110 group-hover:-rotate-12">
                <i data-lucide="cpu" class="w-full h-full text-indigo-500"></i>
            </div>
        </div>
    </div>
</div>
@endsection
