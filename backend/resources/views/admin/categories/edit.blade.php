@extends('layouts.admin')

@section('content')
<div class="max-w-7xl mx-auto pb-20">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 class="text-3xl font-extrabold tracking-tight">Редактирование категории</h1>
            <p class="text-slate-400 text-sm mt-1">ID: #{{ $category->id }} — {{ $category->name }}</p>
        </div>
        <div class="flex gap-3">
            <a href="{{ route('admin.categories.index') }}" class="px-6 py-3 rounded-2xl font-bold text-sm bg-white/5 hover:bg-white/10 transition-all border border-white/10">Назад</a>
            <button type="submit" form="main-form" class="px-8 py-3 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all">Сохранить</button>
        </div>
    </div>

    <form id="main-form" action="{{ route('admin.categories.update', $category) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- ⬅️ Основные данные -->
            <div class="lg:col-span-2 space-y-8">
                
                <!-- Базовая информация -->
                <div class="card-glass p-8">
                    <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
                        <i data-lucide="layout-grid" class="w-5 h-5 text-indigo-400"></i>
                        Данные категории (EN)
                    </h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label for="name" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Название</label>
                            <input type="text" name="name" id="name" value="{{ old('name', $category->name) }}" required
                                   class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none">
                        </div>

                        <div class="space-y-2">
                            <label for="slug" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Slug</label>
                            <input type="text" name="slug" id="slug" value="{{ old('slug', $category->slug) }}"
                                   class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none font-mono text-sm">
                        </div>

                        <div class="md:col-span-2 space-y-2">
                            <label for="description" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Описание</label>
                            <textarea name="description" id="description" rows="3" class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none">{{ old('description', $category->description) }}</textarea>
                        </div>

                        <div class="md:col-span-2 space-y-2">
                            <label for="disclaimer" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Disclaimer / Примечание</label>
                            <textarea name="disclaimer" id="disclaimer" rows="2" class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none text-xs">{{ old('disclaimer', $category->disclaimer) }}</textarea>
                        </div>
                    </div>
                </div>

                <!-- 🌐 Мультиязычность -->
                <div class="card-glass p-8 bg-indigo-600/5 border-indigo-500/20">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <h3 class="text-xl font-black flex items-center gap-3">
                            <i data-lucide="languages" class="w-6 h-6 text-indigo-400"></i>
                            AI Переводы
                        </h3>
                        
                        <div class="flex items-center gap-3 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                            <select id="translation-language-selector" class="bg-transparent border-none text-sm font-bold focus:ring-0 outline-none pr-8">
                                @foreach (config('languages.supported') as $locale => $native)
                                    @if($locale !== 'en')
                                        <option value="{{ $locale }}">{{ strtoupper($locale) }} — {{ config('languages.en_names.' . $locale, $native) }}</option>
                                    @endif
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <div id="translations-container">
                        @foreach (collect(config('locales'))->except('en') as $locale => $label)
                            <div class="translation-block hidden space-y-6 fade-in" data-locale="{{ $locale }}">
                                <div class="flex justify-between items-center bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20 mb-6">
                                    <p class="text-sm font-bold text-indigo-300">Перевод для: {{ $label }}</p>
                                    <button type="button" 
                                            onclick="magicTranslate('category', {{ $category->id }}, '{{ $locale }}')"
                                            class="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-xl text-xs font-black transition-all shadow-lg shadow-indigo-600/20">
                                        <i data-lucide="sparkles" class="w-4 h-4"></i>
                                        MAGIC AI TRANSLATE
                                    </button>
                                </div>

                                <div class="grid grid-cols-1 gap-6">
                                    <div class="space-y-2">
                                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Name ({{ strtoupper($locale) }})</label>
                                        <input type="text" name="translations[name][{{ $locale }}]" data-field="name" value="{{ $category->getTranslation('name', $locale, false) }}" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description ({{ strtoupper($locale) }})</label>
                                        <textarea name="translations[description][{{ $locale }}]" data-field="description" rows="3" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">{{ $category->getTranslation('description', $locale, false) }}</textarea>
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="space-y-2">
                                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SEO Title</label>
                                            <input type="text" name="translations[seo_title][{{ $locale }}]" data-field="seo_title" value="{{ $category->getTranslation('seo_title', $locale, false) }}" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">
                                        </div>
                                        <div class="space-y-2">
                                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SEO Meta</label>
                                            <input type="text" name="translations[seo_description][{{ $locale }}]" data-field="seo_description" value="{{ $category->getTranslation('seo_description', $locale, false) }}" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">
                                        </div>
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Disclaimer ({{ strtoupper($locale) }})</label>
                                        <textarea name="translations[disclaimer][{{ $locale }}]" data-field="disclaimer" rows="2" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all text-xs">{{ $category->getTranslation('disclaimer', $locale, false) }}</textarea>
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
                    <h3 class="font-bold mb-6">Статус</h3>
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-bold">Активна</span>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="hidden" name="is_active" value="0">
                            <input type="checkbox" name="is_active" value="1" {{ $category->is_active ? 'checked' : '' }} class="sr-only peer">
                            <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                </div>

                <!-- Иконка -->
                <div class="card-glass p-8 space-y-6">
                    <h3 class="font-bold flex items-center gap-2">
                        <i data-lucide="image" class="w-5 h-5 text-indigo-400"></i>
                        Иконка
                    </h3>
                    @if($category->icon)
                        <div class="relative group rounded-2xl overflow-hidden border border-white/10 p-4 bg-black/40 flex items-center justify-center">
                            <img src="{{ asset('storage/' . $category->icon) }}" class="w-20 h-20 object-contain" alt="">
                        </div>
                    @endif
                    <input type="file" name="icon" accept="image/*" class="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-indigo-600/20 file:text-indigo-400">
                    @error('icon')
                        <p class="text-red-500 text-[10px] mt-1 font-bold italic">{{ $message }}</p>
                    @enderror
                </div>

                <!-- SEO (EN) -->
                <div class="card-glass p-8">
                    <h3 class="font-bold mb-6 flex items-center gap-2">
                        <i data-lucide="search" class="w-5 h-5 text-indigo-400"></i>
                        SEO (English)
                    </h3>
                    <div class="space-y-4">
                        <div class="space-y-2">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Title Tag</label>
                            <input type="text" name="seo_title" value="{{ $category->seo_title }}" class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Meta Description</label>
                            <textarea name="seo_description" rows="3" class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500">{{ $category->seo_description }}</textarea>
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

    async function magicTranslate(type, id, lang) {
        if(!confirm('Использовать ИИ для перевода?')) return;
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
                alert('✨ Перевод категории завершен!');
            }
        } catch (e) { alert('Ошибка сети.'); }
        finally { btn.innerHTML = originalHtml; btn.disabled = false; lucide.createIcons(); }
    }
</script>
@endpush