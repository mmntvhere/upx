@extends('layouts.admin')

@section('content')
<div class="max-w-7xl mx-auto pb-20">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 class="text-3xl font-extrabold tracking-tight">Добавить новый сайт</h1>
            <p class="text-slate-400 text-sm mt-1">Оформите карточку и обзор для нового ресурса</p>
        </div>
        <div class="flex gap-3">
            <a href="{{ route('admin.sites.index') }}" class="px-6 py-3 rounded-2xl font-bold text-sm bg-white/5 hover:bg-white/10 transition-all border border-white/10">Отмена</a>
            <button type="submit" form="main-form" class="px-8 py-3 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all">Создать сайт</button>
        </div>
    </div>

    <form id="main-form" action="{{ route('admin.sites.store') }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- ⬅️ Левая колонка: Основные данные -->
            <div class="lg:col-span-2 space-y-8">
                
                <!-- Основная информация -->
                <div class="card-glass p-8">
                    <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
                        <i data-lucide="plus-circle" class="w-5 h-5 text-indigo-400"></i>
                        Базовая информация
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label for="name" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Название</label>
                            <input type="text" name="name" id="name" value="{{ old('name') }}" required
                                   class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none"
                                   placeholder="Например: Pornhub">
                        </div>

                        <div class="space-y-2">
                            <label for="slug" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Slug (URL)</label>
                            <input type="text" name="slug" id="slug" value="{{ old('slug') }}"
                                   class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none font-mono text-sm"
                                   placeholder="pornhub">
                        </div>

                        <div class="md:col-span-2 space-y-2">
                            <label for="link" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Ссылка</label>
                            <input type="url" name="link" id="link" value="{{ old('link') }}"
                                   class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none"
                                   placeholder="https://...">
                        </div>

                        <div class="space-y-2">
                            <label for="category_id" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Категория</label>
                            <select name="category_id" id="category_id"
                                    class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none">
                                <option value="">Выберите категорию</option>
                                @foreach($categories as $category)
                                    <option value="{{ $category->id }}" {{ old('category_id') == $category->id ? 'selected' : '' }}>
                                        {{ $category->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div class="space-y-2">
                            <label for="rating" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Рейтинг (0-10)</label>
                            <div class="relative">
                                <input type="number" name="rating" id="rating" min="0" max="10" step="0.1" value="{{ old('rating') }}"
                                       class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none">
                                <i data-lucide="star" class="absolute right-4 top-3.5 w-4 h-4 text-amber-500"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Контентный блок -->
                <div class="card-glass p-8">
                    <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
                        <i data-lucide="file-text" class="w-5 h-5 text-indigo-400"></i>
                        Описание и Обзор (EN)
                    </h3>
                    <div class="space-y-6">
                        <div class="space-y-2">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Короткое описание</label>
                            <textarea name="description" rows="2" class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none">{{ old('description') }}</textarea>
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Полный обзор</label>
                            <textarea name="review" rows="8" class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none">{{ old('review') }}</textarea>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest px-1">Плюсы (через Enter)</label>
                                <textarea name="pros" rows="4" class="w-full px-4 py-3 bg-black/20 border border-emerald-500/10 rounded-xl focus:border-emerald-500 transition-all outline-none">{{ old('pros') }}</textarea>
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-bold text-red-500/80 uppercase tracking-widest px-1">Минусы (через Enter)</label>
                                <textarea name="cons" rows="4" class="w-full px-4 py-3 bg-black/20 border border-red-500/10 rounded-xl focus:border-red-500 transition-all outline-none">{{ old('cons') }}</textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 🌐 Мультиязычность -->
                <div class="card-glass p-8 bg-indigo-600/5 border-indigo-500/20">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <p class="text-xl font-black flex items-center gap-3">
                            <i data-lucide="languages" class="w-6 h-6 text-indigo-400"></i>
                            Ручные переводы
                        </p>
                        
                        <div class="flex items-center gap-3 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                            <select id="translation-language-selector" class="bg-transparent border-none text-sm font-bold focus:ring-0 outline-none pr-8">
                                @foreach (collect(config('locales'))->except('en') as $locale => $label)
                                    <option value="{{ $locale }}">{{ strtoupper($locale) }} — {{ $label }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <div id="translations-container">
                        @foreach (collect(config('locales'))->except('en') as $locale => $label)
                            <div class="translation-block hidden space-y-6 fade-in" data-locale="{{ $locale }}">
                                <div class="bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20 mb-6 font-bold text-indigo-300 text-sm text-center">
                                    Заполните данные для языка: {{ $label }}
                                </div>

                                <div class="grid grid-cols-1 gap-6">
                                    <div class="space-y-2">
                                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description ({{ strtoupper($locale) }})</label>
                                        <textarea name="translations[description][{{ $locale }}]" rows="2" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">{{ old("translations.description.$locale") }}</textarea>
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Review ({{ strtoupper($locale) }})</label>
                                        <textarea name="translations[review][{{ $locale }}]" rows="5" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">{{ old("translations.review.$locale") }}</textarea>
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="space-y-2">
                                            <label class="text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest">Pros</label>
                                            <textarea name="translations[pros][{{ $locale }}]" rows="3" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">{{ old("translations.pros.$locale") }}</textarea>
                                        </div>
                                        <div class="space-y-2">
                                            <label class="text-[10px] font-bold text-red-500/50 uppercase tracking-widest">Cons</label>
                                            <textarea name="translations[cons][{{ $locale }}]" rows="3" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">{{ old("translations.cons.$locale") }}</textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>

            <!-- ➡️ Правая колонка: Медиа и Настройки -->
            <div class="space-y-8">
                
                <!-- Статус и Теги -->
                <div class="card-glass p-8">
                    <div class="flex items-center justify-between mb-8">
                        <h3 class="font-bold">Настройки</h3>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="hidden" name="is_active" value="0">
                            <input type="checkbox" name="is_active" value="1" checked class="sr-only peer">
                            <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            <span class="ml-3 text-sm font-bold">Active</span>
                        </label>
                    </div>

                    <div class="space-y-6">
                        <div class="space-y-2">
                            <label for="tags" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Теги сайта</label>
                            <select name="tags[]" id="tags" multiple class="w-full bg-black/20 border border-white/10 rounded-xl">
                                @foreach($allTags as $tag)
                                    <option value="{{ $tag->id }}" {{ collect(old('tags'))->contains($tag->id) ? 'selected' : '' }}>{{ $tag->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Локализация (Доступность) -->
                <div class="card-glass p-8">
                    <h3 class="font-bold mb-4 flex items-center gap-2">
                        <i data-lucide="globe" class="w-5 h-5 text-indigo-400"></i>
                        Доступность
                    </h3>
                    <p class="text-[10px] text-slate-500 uppercase tracking-widest mb-6 px-1">Где показывать этот сайт?</p>
                    
                    <div class="space-y-4">
                        <label class="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-all">
                            <input type="checkbox" id="show_everywhere" {{ empty(old('enabled_languages', [])) ? 'checked' : '' }} onchange="toggleLanguageCheckboxes(this)" class="w-5 h-5 rounded border-white/10 bg-black/20 text-indigo-600 focus:ring-indigo-500">
                            <span class="text-sm font-bold">Везде (на всех языках)</span>
                        </label>

                        <div id="language-checkboxes" class="grid grid-cols-2 gap-2 mt-4">
                            @foreach (config('languages.supported') as $locale => $native)
                                <label class="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer">
                                    <input type="checkbox" name="enabled_languages[]" value="{{ $locale }}" {{ in_array($locale, old('enabled_languages', [])) ? 'checked' : '' }} class="language-checkbox w-4 h-4 rounded border-white/10 bg-black/20 text-indigo-600 focus:ring-indigo-500">
                                    <span class="text-xs font-bold text-slate-400">{{ config('languages.en_names.' . $locale, $native) }}</span>
                                </label>
                            @endforeach
                        </div>
                    </div>
                </div>

                <!-- Изображения -->
                <div class="card-glass p-8 space-y-8">
                    <h3 class="font-bold">Медиа файлы</h3>

                    <div class="space-y-4">
                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Карточка (Preview)</label>
                        <input type="file" name="preview" accept="image/*" class="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-indigo-600/20 file:text-indigo-400">
                    </div>

                    <div class="space-y-4">
                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Заголовок (Main Image)</label>
                        <input type="file" name="main_image" accept="image/*" class="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-indigo-600/20 file:text-indigo-400">
                    </div>

                    <div class="space-y-4">
                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Favicon</label>
                        <input type="file" name="favicon" accept="image/x-icon,image/png,image/svg+xml" class="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-indigo-600/20 file:text-indigo-400 hover:file:bg-indigo-600/30">
                    </div>
                </div>

                <!-- SEO Базовый -->
                <div class="card-glass p-8">
                    <h3 class="font-bold mb-6 flex items-center gap-2">
                        <i data-lucide="search" class="w-5 h-5 text-indigo-400"></i>
                        SEO База (EN)
                    </h3>
                    <div class="space-y-4">
                        <div class="space-y-2">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Title Tag</label>
                            <input type="text" name="seo_title" value="{{ old('seo_title') }}" class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Meta Description</label>
                            <textarea name="seo_description" rows="3" class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500">{{ old('seo_description') }}</textarea>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </form>
</div>
@endsection

@push('styles')
    <link href="https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/css/tom-select.css" rel="stylesheet">
    <style>
        .ts-control { background: rgba(0,0,0,0.2) !important; border: 1px solid rgba(255,255,255,0.1) !important; border-radius: 12px !important; color: white !important; padding: 10px !important; }
        .ts-dropdown { background: #1e1b4b !important; border: 1px solid rgba(255,255,255,0.1) !important; color: white !important; }
        .ts-dropdown .active { background: #4f46e5 !important; }
        .ts-control .item { background: #4f46e5 !important; color: white !important; border-radius: 6px !important; }
    </style>
@endpush

@push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/tom-select@2.2.2/dist/js/tom-select.complete.min.js"></script>
    <script>
        new TomSelect('#tags', { plugins: ['remove_button'], create: true });
        
        document.addEventListener('DOMContentLoaded', () => {
            const selector = document.getElementById('translation-language-selector');
            const blocks = document.querySelectorAll('.translation-block');
            function updateVisibleTranslation() {
                const selected = selector.value;
                blocks.forEach(block => block.dataset.locale === selected ? block.classList.remove('hidden') : block.classList.add('hidden'));
            }
            selector.addEventListener('change', updateVisibleTranslation);
            updateVisibleTranslation();
            
            // Availability logic
            window.toggleLanguageCheckboxes = function(master) {
                const checkboxes = document.querySelectorAll('.language-checkbox');
                if (master.checked) checkboxes.forEach(cb => cb.checked = false);
            };
            document.querySelectorAll('.language-checkbox').forEach(cb => {
                cb.addEventListener('change', () => {
                    document.getElementById('show_everywhere').checked = false;
                });
            });
        });
    </script>
@endpush