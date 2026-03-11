@extends('layouts.admin')

@section('content')
<div class="max-w-7xl mx-auto pb-20">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 class="text-3xl font-extrabold tracking-tight">Новая страница</h1>
            <p class="text-slate-400 text-sm mt-1">Оформите контент для нового раздела сайта</p>
        </div>
        <div class="flex gap-3">
            <a href="{{ route('admin.pages.index') }}" class="px-6 py-3 rounded-2xl font-bold text-sm bg-white/5 hover:bg-white/10 transition-all border border-white/10">Отмена</a>
            <button type="submit" form="main-form" class="px-8 py-3 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all">Создать страницу</button>
        </div>
    </div>

    <form id="main-form" action="{{ route('admin.pages.store') }}" method="POST" class="space-y-8">
        @csrf

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- ⬅️ Основной контент -->
            <div class="lg:col-span-2 space-y-8">
                
                <!-- Базовые данные (English) -->
                <div class="card-glass p-8">
                    <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
                        <i data-lucide="file-plus" class="w-5 h-5 text-indigo-400"></i>
                        Содержимое (English)
                    </h3>
                    
                    <div class="space-y-6">
                        <div class="space-y-2">
                            <label for="title" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Название страницы (Menu Title)</label>
                            <input type="text" name="title" id="title" value="{{ old('title') }}" required
                                   class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none"
                                   placeholder="Например: Terms of Service">
                        </div>

                        <div class="space-y-2">
                            <label for="slug" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Slug (URL Path)</label>
                            <input type="text" name="slug" id="slug" value="{{ old('slug') }}"
                                   class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none font-mono text-sm"
                                   placeholder="terms-of-service">
                        </div>

                        <div class="space-y-2">
                            <label for="content" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">HTML Контент</label>
                            <textarea name="content" id="content" rows="12"
                                      class="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:border-indigo-500 transition-all outline-none font-mono text-xs">{{ old('content') }}</textarea>
                        </div>
                    </div>
                </div>

                <!-- 🌐 Мультиязычность -->
                <div class="card-glass p-8 bg-indigo-600/5 border-indigo-500/20">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <h3 class="text-xl font-black flex items-center gap-3">
                            <i data-lucide="languages" class="w-6 h-6 text-indigo-400"></i>
                            Ручные переводы
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
                                <div class="bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20 mb-6 font-bold text-indigo-300 text-sm text-center">
                                    Заполните данные для языка: {{ $label }}
                                </div>

                                <div class="grid grid-cols-1 gap-6">
                                    <div class="space-y-2">
                                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Title ({{ strtoupper($locale) }})</label>
                                        <input type="text" name="translations[title][{{ $locale }}]" value="{{ old("translations.title.$locale") }}" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Content ({{ strtoupper($locale) }})</label>
                                        <textarea name="translations[content][{{ $locale }}]" rows="6" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all font-mono text-xs">{{ old("translations.content.$locale") }}</textarea>
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="space-y-2">
                                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SEO Title</label>
                                            <input type="text" name="translations[seo_title][{{ $locale }}]" value="{{ old("translations.seo_title.$locale") }}" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">
                                        </div>
                                        <div class="space-y-2">
                                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SEO Meta</label>
                                            <input type="text" name="translations[seo_description][{{ $locale }}]" value="{{ old("translations.seo_description.$locale") }}" class="w-full px-4 py-3 bg-black/40 border border-white/5 rounded-xl outline-none focus:border-indigo-500 transition-all">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                    
                    <p class="mt-8 text-center text-xs text-slate-500">
                        <i data-lucide="info" class="w-3 h-3 inline-block -mt-1 mr-1"></i>
                        После создания страницы вы сможете использовать <strong>AI Magic Translate</strong> для мгновенного авто-перевода.
                    </p>
                </div>
            </div>

            <!-- ➡️ Боковая панель -->
            <div class="space-y-8">
                
                <!-- Настройки -->
                <div class="card-glass p-8">
                    <h3 class="font-bold mb-6">Свойства</h3>
                    
                    <div class="space-y-8">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-bold">Отображать</span>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="hidden" name="is_active" value="0">
                                <input type="checkbox" name="is_active" value="1" checked class="sr-only peer">
                                <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        <div class="space-y-2">
                            <label for="position" class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Порядковый номер</label>
                            <input type="number" name="position" id="position" value="{{ old('position', 0) }}" 
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
                            <input type="text" name="seo_title" value="{{ old('seo_title') }}" class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500">
                        </div>
                        <div class="space-y-2 text-sm">
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
</script>
@endpush
