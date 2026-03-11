@extends('layouts.admin')

@php use Illuminate\Support\Facades\Storage; @endphp

@section('content')
<div class="max-w-7xl mx-auto pb-20">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 class="text-3xl font-extrabold tracking-tight">Редактирование сайта</h1>
            <p class="text-slate-400 text-sm mt-1">ID: #{{ $site->id }} — {{ $site->name }}</p>
        </div>
        <div class="flex gap-3">
            <a href="{{ route('admin.sites.index') }}" class="px-6 py-3 rounded-2xl font-bold text-sm bg-white/5 hover:bg-white/10 transition-all border border-white/10">Назад к списку</a>
            <button type="submit" form="main-form" class="px-8 py-3 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all">Сохранить изменения</button>
        </div>
    </div>

    <form id="main-form" action="{{ route('admin.sites.update', $site) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- ⬅️ Левая колонка: Основные данные -->
            <div class="lg:col-span-2 space-y-8">
                
                <!-- Основная информация -->
                <div class="card-glass p-8">
                    <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
                        <i data-lucide="info" class="w-5 h-5 text-indigo-400"></i>
                        Базовая информация
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label for="name" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Название</label>
                            <input type="text" name="name" id="name" value="{{ $site->name }}" required
                                   class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none">
                        </div>

                        <div class="space-y-2">
                            <label for="slug" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Slug (URL)</label>
                            <input type="text" name="slug" id="slug" value="{{ $site->slug }}"
                                   class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none font-mono text-sm">
                        </div>

                        <div class="md:col-span-2 space-y-2">
                            <label for="link" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Партнерская ссылка</label>
                            <input type="url" name="link" id="link" value="{{ $site->link }}"
                                   class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none">
                        </div>

                        <div class="space-y-2 h-full">
                            <label for="category_id" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Категория</label>
                            <select name="category_id" id="category_id"
                                    class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none">
                                <option value="">Выберите категорию</option>
                                @foreach($categories as $category)
                                    <option value="{{ $category->id }}" {{ $site->category_id == $category->id ? 'selected' : '' }}>
                                        {{ $category->name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div class="space-y-2">
                            <label for="rating" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Рейтинг (0-10)</label>
                            <div class="relative">
                                <input type="number" name="rating" id="rating" min="0" max="10" step="0.1" value="{{ $site->rating }}"
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
                        Контент (English / Default)
                    </h3>
                    <div class="space-y-6">
                        <div class="space-y-2">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Короткое описание</label>
                            <textarea name="description" rows="2" class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none">{{ $site->description }}</textarea>
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Полный обзор</label>
                            <textarea name="review" rows="8" class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none">{{ $site->review }}</textarea>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest px-1">Плюсы (через Enter)</label>
                                <textarea name="pros" rows="4" class="w-full px-4 py-3 bg-black/20 border border-emerald-500/10 rounded-xl focus:border-emerald-500 transition-all outline-none">{{ $site->pros }}</textarea>
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-bold text-red-500/80 uppercase tracking-widest px-1">Минусы (через Enter)</label>
                                <textarea name="cons" rows="4" class="w-full px-4 py-3 bg-black/20 border border-red-500/10 rounded-xl focus:border-red-500 transition-all outline-none">{{ $site->cons }}</textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 🌐 Продвинутые переводы -->
                <div class="card-glass p-8 bg-indigo-600/5 border-indigo-500/20">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <h3 class="text-xl font-black flex items-center gap-3">
                            <i data-lucide="languages" class="w-6 h-6 text-indigo-400"></i>
                            Мультиязычный контент
                        </h3>
                        
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
                                <div class="flex justify-between items-center bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20 mb-6">
                                    <p class="text-sm font-bold text-indigo-300">Редактирование версии для: {{ $label }}</p>
                                    <button type="button" 
                                            onclick="magicTranslate('site', {{ $site->id }}, '{{ $locale }}')"
                                            class="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-xl text-xs font-black transition-all shadow-lg shadow-indigo-600/20">
                                        <i data-lucide="sparkles" class="w-4 h-4"></i>
                                        MAGIC AI TRANSLATE
                                    </button>
                                </div>

                                <div class="grid grid-cols-1 gap-6">
                                    <div class="space-y-2">
                                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description ({{ strtoupper($locale) }})</label>
                                        <textarea name="translations[description][{{ $locale }}]" data-field="description" rows="2" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">{{ $site->getTranslation('description', $locale, false) }}</textarea>
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Review ({{ strtoupper($locale) }})</label>
                                        <textarea name="translations[review][{{ $locale }}]" data-field="review" rows="5" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">{{ $site->getTranslation('review', $locale, false) }}</textarea>
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="space-y-2">
                                            <label class="text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest">Pros</label>
                                            <textarea name="translations[pros][{{ $locale }}]" data-field="pros" rows="3" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">{{ $site->getTranslation('pros', $locale, false) }}</textarea>
                                        </div>
                                        <div class="space-y-2">
                                            <label class="text-[10px] font-bold text-red-500/50 uppercase tracking-widest">Cons</label>
                                            <textarea name="translations[cons][{{ $locale }}]" data-field="cons" rows="3" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">{{ $site->getTranslation('cons', $locale, false) }}</textarea>
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="space-y-2">
                                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SEO Title</label>
                                            <input type="text" name="translations[seo_title][{{ $locale }}]" data-field="seo_title" value="{{ $site->getTranslation('seo_title', $locale, false) }}" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">
                                        </div>
                                        <div class="space-y-2">
                                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SEO Meta</label>
                                            <input type="text" name="translations[seo_description][{{ $locale }}]" data-field="seo_description" value="{{ $site->getTranslation('seo_description', $locale, false) }}" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">
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
                
                <!-- Локализация (Доступность) -->
                <div class="card-glass p-8">
                    <h3 class="font-bold mb-4 flex items-center gap-2">
                        <i data-lucide="globe" class="w-5 h-5 text-indigo-400"></i>
                        Доступность
                    </h3>
                    <p class="text-[10px] text-slate-500 uppercase tracking-widest mb-6 px-1">Где показывать этот сайт?</p>
                    
                    @php
                        $enabledLangs = is_array($site->enabled_languages) ? $site->enabled_languages : [];
                    @endphp

                    <div class="space-y-4">
                        <label class="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-all">
                            <input type="checkbox" id="show_everywhere" {{ empty($enabledLangs) ? 'checked' : '' }} onchange="toggleLanguageCheckboxes(this)" class="w-5 h-5 rounded border-white/10 bg-black/20 text-indigo-600 focus:ring-indigo-500">
                            <span class="text-sm font-bold">Везде (на всех языках)</span>
                        </label>

                        <div id="language-checkboxes" class="grid grid-cols-2 gap-2 mt-4">
                            @foreach (config('languages.supported') as $locale => $native)
                                <label class="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer">
                                    <input type="checkbox" name="enabled_languages[]" value="{{ $locale }}" {{ in_array($locale, $enabledLangs) ? 'checked' : '' }} class="language-checkbox w-4 h-4 rounded border-white/10 bg-black/20 text-indigo-600 focus:ring-indigo-500">
                                    <span class="text-xs font-bold text-slate-400">{{ config('languages.en_names.' . $locale, $native) }}</span>
                                </label>
                            @endforeach
                        </div>
                    </div>
                </div>

                <!-- Статус и Теги -->
                <div class="card-glass p-8">
                    <div class="flex items-center justify-between mb-8">
                        <h3 class="font-bold">Настройки</h3>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="hidden" name="is_active" value="0">
                            <input type="checkbox" name="is_active" value="1" {{ $site->is_active ? 'checked' : '' }} class="sr-only peer">
                            <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            <span class="ml-3 text-sm font-bold">Active</span>
                        </label>
                    </div>

                    <div class="space-y-6">
                        <div class="space-y-2">
                            <label for="tags" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Теги сайта</label>
                            <select name="tags[]" id="tags" multiple class="w-full bg-black/20 border border-white/10 rounded-xl">
                                @foreach($allTags as $tag)
                                    <option value="{{ $tag->id }}" {{ (collect(old('tags', $site->tags->pluck('id')))->contains($tag->id)) ? 'selected' : '' }}>{{ $tag->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Изображения -->
                <div class="card-glass p-8 space-y-8">
                    <h3 class="font-bold flex items-center gap-2">
                        <i data-lucide="image" class="w-5 h-5 text-indigo-400"></i>
                        Медиа файлы
                    </h3>

                    <!-- Preview -->
                    <div class="space-y-4">
                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Карточка сайта (Preview)</label>
                        @if ($site->preview)
                            <div class="relative group rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black/40">
                                <img src="{{ asset('storage/' . $site->preview) }}" class="w-full h-full object-cover" alt="">
                                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button type="button" onclick="removeImage({{ $site->id }}, 'preview')" class="bg-red-500 hover:bg-red-400 text-white p-3 rounded-xl transition-all"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
                                </div>
                            </div>
                        @endif
                        <input type="file" name="preview" accept="image/*" class="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-indigo-600/20 file:text-indigo-400 hover:file:bg-indigo-600/30">
                    </div>

                    <!-- Main Image -->
                    <div class="space-y-4">
                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Заголовок страницы (Main Image)</label>
                        @if ($site->main_image)
                            <div class="relative group rounded-2xl overflow-hidden border border-white/10 aspect-[2/1] bg-black/40">
                                <img src="{{ asset('storage/' . $site->main_image) }}" class="w-full h-full object-cover" alt="">
                                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button type="button" onclick="removeImage({{ $site->id }}, 'main_image')" class="bg-red-500 hover:bg-red-400 text-white p-3 rounded-xl transition-all"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
                                </div>
                            </div>
                        @endif
                        <input type="file" name="main_image" accept="image/*" class="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-indigo-600/20 file:text-indigo-400 hover:file:bg-indigo-600/30">
                    </div>

                    <!-- Favicon -->
                    <div class="flex items-center gap-6 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div class="space-y-2 flex-1">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Favicon</label>
                            <input type="file" name="favicon" accept="image/x-icon,image/png,image/svg+xml" class="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-indigo-600/20 file:text-indigo-400 hover:file:bg-indigo-600/30">
                        </div>
                        @if ($site->favicon)
                            <div class="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center p-2 relative group">
                                <img src="{{ asset('storage/' . $site->favicon) }}" class="w-full h-full object-contain" alt="">
                                <button type="button" onclick="removeImage({{ $site->id }}, 'favicon')" class="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-red-500/30"><i data-lucide="x" class="w-3 h-3 text-white"></i></button>
                            </div>
                        @endif
                    </div>
                </div>

                <!-- SEO Базовый -->
                <div class="card-glass p-8">
                    <h3 class="font-bold mb-6 flex items-center gap-2">
                        <i data-lucide="search" class="w-5 h-5 text-indigo-400"></i>
                        SEO База (EN)
                    </h3>
                    <div class="space-y-4">
                        <div class="space-y-2 text-sm">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Title Tag</label>
                            <input type="text" name="seo_title" value="{{ $site->seo_title }}" class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500">
                        </div>
                        <div class="space-y-2 text-sm">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Meta Description</label>
                            <textarea name="seo_description" rows="3" class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500">{{ $site->seo_description }}</textarea>
                        </div>
                    </div>
                </div>

                <!-- Удаление -->
                <button type="button" onclick="deleteSite({{ $site->id }})" class="w-full py-4 text-xs font-black text-red-500 hover:bg-red-500/10 rounded-2xl border border-red-500/20 transition-all uppercase tracking-widest">Удалить этот сайт</button>
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
        
        // Tab logic
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

        // Image removal
        function removeImage(siteId, field) {
            if (!confirm('Удалить изображение?')) return;
            fetch(`/admin/sites/${siteId}/remove-image/${field}`, { method: 'DELETE', headers: { 'X-CSRF-TOKEN': '{{ csrf_token() }}' } })
                .then(res => res.ok && location.reload());
        }

        // Delete site
        function deleteSite(siteId) {
            if (!confirm('Удалить сайт безвозвратно?')) return;
            fetch(`/admin/sites/${siteId}`, { method: 'DELETE', headers: { 'X-CSRF-TOKEN': '{{ csrf_token() }}' } })
                .then(res => res.ok && (window.location.href = '{{ route('admin.sites.index') }}'));
        }

        // Magic Translate
        async function magicTranslate(type, id, lang) {
            if(!confirm('Использовать ИИ для перевода этой вкладки? Текущие данные будут перезаписаны.')) return;
            const btn = event.currentTarget;
            const originalHtml = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Loading...';
            lucide.createIcons();

            try {
                const res = await fetch("{{ route('admin.translate.single') }}", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': '{{ csrf_token() }}' },
                    body: JSON.stringify({ model_type: type, model_id: id, target_lang: lang })
                });
                const data = await res.json();
                if (data.success) {
                    const block = document.querySelector(`.translation-block[data-locale="${lang}"]`);
                    Object.entries(data.translations).forEach(([field, value]) => {
                        const input = block.querySelector(`[data-field="${field}"]`);
                        if(input) input.value = Array.isArray(value) ? JSON.stringify(value, null, 2) : value;
                    });
                    alert('✨ Перевод успешно завершен!');
                }
            } catch (e) { alert('Ошибка сети.'); }
            finally { btn.innerHTML = originalHtml; btn.disabled = false; lucide.createIcons(); }
        }
    </script>
@endpush
