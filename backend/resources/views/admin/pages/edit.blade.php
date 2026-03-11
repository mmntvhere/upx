@extends('layouts.admin')

@section('content')
<div class="max-w-7xl mx-auto pb-20">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 class="text-3xl font-extrabold tracking-tight">Редактирование страницы</h1>
            <p class="text-slate-400 text-sm mt-1">ID: #{{ $page->id }} — {{ $page->getTranslation('title', 'en') }}</p>
        </div>
        <div class="flex gap-3">
            <a href="{{ route('admin.pages.index') }}" class="px-6 py-3 rounded-2xl font-bold text-sm bg-white/5 hover:bg-white/10 transition-all border border-white/10">Назад к списку</a>
            <button type="submit" form="main-form" class="px-8 py-3 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all">Сохранить изменения</button>
        </div>
    </div>

    <form id="main-form" action="{{ route('admin.pages.update', $page) }}" method="POST" class="space-y-8">
        @csrf
        @method('PUT')

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- ⬅️ Основной контент -->
            <div class="lg:col-span-2 space-y-8">
                
                <!-- Базовые данные (English) -->
                <div class="card-glass p-8">
                    <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
                        <i data-lucide="file-text" class="w-5 h-5 text-indigo-400"></i>
                        Основной контент (English)
                    </h3>
                    
                    <div class="space-y-6">
                        <div class="space-y-2">
                            <label for="title" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Название (Menu Title)</label>
                            <input type="text" name="title" id="title" value="{{ old('title', $page->getTranslation('title', 'en')) }}" required
                                   class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none">
                        </div>

                        <div class="space-y-2">
                            <label for="slug" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Slug (URL Path)</label>
                            <input type="text" name="slug" id="slug" value="{{ old('slug', $page->slug) }}"
                                   class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none font-mono text-sm">
                        </div>

                        <div class="space-y-2">
                            <label for="content" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">HTML Содержимое</label>
                            <textarea name="content" id="content" rows="12"
                                      class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none font-mono text-xs">{{ old('content', $page->getTranslation('content', 'en')) }}</textarea>
                        </div>
                    </div>
                </div>

                <!-- 🌐 Мультиязычность -->
                <div class="card-glass p-8 bg-indigo-600/5 border-indigo-500/20">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <h3 class="text-xl font-black flex items-center gap-3">
                            <i data-lucide="languages" class="w-6 h-6 text-indigo-400"></i>
                            Переводы через AI
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
                                    <p class="text-sm font-bold text-indigo-300">Целевой язык: {{ $label }}</p>
                                    <button type="button" 
                                            onclick="magicTranslate('page', {{ $page->id }}, '{{ $locale }}')"
                                            class="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-xl text-xs font-black transition-all shadow-lg shadow-indigo-600/20">
                                        <i data-lucide="sparkles" class="w-4 h-4"></i>
                                        MAGIC AI TRANSLATE
                                    </button>
                                </div>

                                <div class="grid grid-cols-1 gap-6">
                                    <div class="space-y-2">
                                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Title ({{ strtoupper($locale) }})</label>
                                        <input type="text" name="translations[title][{{ $locale }}]" data-field="title" value="{{ $page->getTranslation('title', $locale, false) }}" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Content ({{ strtoupper($locale) }})</label>
                                        <textarea name="translations[content][{{ $locale }}]" data-field="content" rows="10" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all font-mono text-xs">{{ $page->getTranslation('content', $locale, false) }}</textarea>
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="space-y-2">
                                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SEO Title</label>
                                            <input type="text" name="translations[seo_title][{{ $locale }}]" data-field="seo_title" value="{{ $page->getTranslation('seo_title', $locale, false) }}" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">
                                        </div>
                                        <div class="space-y-2">
                                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SEO Meta</label>
                                            <input type="text" name="translations[seo_description][{{ $locale }}]" data-field="seo_description" value="{{ $page->getTranslation('seo_description', $locale, false) }}" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>

            <!-- ➡️ Боковая панель -->
            <div class="space-y-8">
                
                <!-- Настройки -->
                <div class="card-glass p-8">
                    <h3 class="font-bold mb-6">Свойства страницы</h3>
                    
                    <div class="space-y-8">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-bold">Отображать</span>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="hidden" name="is_active" value="0">
                                <input type="checkbox" name="is_active" value="1" {{ $page->is_active ? 'checked' : '' }} class="sr-only peer">
                                <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        <div class="space-y-2">
                            <label for="position" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Порядковый номер</label>
                            <input type="number" name="position" id="position" value="{{ $page->position }}" 
                                   class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl outline-none focus:border-indigo-500">
                        </div>
                    </div>
                </div>

                <!-- SEO (EN) -->
                <div class="card-glass p-8">
                    <h3 class="font-bold mb-6 flex items-center gap-2">
                        <i data-lucide="search" class="w-5 h-5 text-indigo-400"></i>
                        SEO (English)
                    </h3>
                    <div class="space-y-4">
                        <div class="space-y-2 text-sm">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Title Tag</label>
                            <input type="text" name="seo_title" value="{{ $page->getTranslation('seo_title', 'en') }}" class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500">
                        </div>
                        <div class="space-y-2 text-sm">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Meta Description</label>
                            <textarea name="seo_description" rows="3" class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500">{{ $page->getTranslation('seo_description', 'en') }}</textarea>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </form>
</div>
@endsection

@push('scripts')
<script>
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
    });

    // Magic Translate
    async function magicTranslate(type, id, lang) {
        if(!confirm('Использовать AI для перевода этой страницы?')) return;
        const btn = event.currentTarget;
        const originalHtml = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Processing...';
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
                    if(input) input.value = value;
                });
                alert('✨ Перевод статической страницы завершен успешно!');
            }
        } catch (e) { alert('Ошибка сети.'); }
        finally { btn.innerHTML = originalHtml; btn.disabled = false; lucide.createIcons(); }
    }
</script>
@endpush
