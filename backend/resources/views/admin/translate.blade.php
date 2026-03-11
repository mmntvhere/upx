@extends('layouts.admin')

@section('content')
<div class="max-w-5xl mx-auto">
    <div class="mb-10 text-center">
        <h1 class="text-4xl font-black tracking-tight mb-4 liquid-gradient">AI Translation Hub</h1>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
            Мощная интеграция DeepL для массового перевода контента. Искусственный интеллект обработает пустые поля, сохраняя каждый HTML-тег.
        </p>
    </div>

    <!-- ⚡ Cards Container -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        
        <!-- Категории Card -->
        <div class="card-glass relative overflow-hidden group">
            <div class="p-8 relative z-10">
                <div class="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                    <i data-lucide="layers" class="w-8 h-8"></i>
                </div>
                <h3 class="text-2xl font-bold mb-3">Категории</h3>
                <p class="text-slate-400 text-sm mb-8 leading-relaxed">
                    Быстрая обработка названий, описаний и SEO-метаданных для всех категорий на 27 языков.
                </p>
                <button onclick="startTranslation('category')" 
                        class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-3">
                    <i data-lucide="play" class="w-5 h-5"></i>
                    Начать перевод
                </button>
            </div>
            <div class="absolute -right-4 -bottom-4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
        </div>

        <!-- Сайты Card -->
        <div class="card-glass relative overflow-hidden group">
            <div class="p-8 relative z-10">
                <div class="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                    <i data-lucide="monitor" class="w-8 h-8"></i>
                </div>
                <h3 class="text-2xl font-bold mb-3">Сайты & Обзоры</h3>
                <p class="text-slate-400 text-sm mb-8 leading-relaxed">
                    Пакетный перевод тяжелого контента: подробные обзоры, списки плюсов/минусов и SEO поля.
                </p>
                <button onclick="startTranslation('site')" 
                        class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-3">
                    <i data-lucide="play" class="w-5 h-5"></i>
                    Начать перевод
                </button>
            </div>
            <div class="absolute -right-4 -bottom-4 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>
        </div>

        <!-- Страницы Card -->
        <div class="card-glass relative overflow-hidden group md:col-span-2 lg:col-span-1">
            <div class="p-8 relative z-10">
                <div class="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                    <i data-lucide="file-code" class="w-8 h-8"></i>
                </div>
                <h3 class="text-2xl font-bold mb-3">Статические страницы</h3>
                <p class="text-slate-400 text-sm mb-8 leading-relaxed">
                    Перевод контента сервисных страниц, правил и условий с полным сохранением HTML структуры.
                </p>
                <button onclick="startTranslation('page')" 
                        class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 active:scale-95 flex items-center justify-center gap-3">
                    <i data-lucide="play" class="w-5 h-5"></i>
                    Начать перевод
                </button>
            </div>
            <div class="absolute -right-4 -bottom-4 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
        </div>
    </div>

    <!-- 💡 Informational Glow Box -->
    <div class="card-glass border-amber-500/20 bg-amber-500/5 p-6 mb-12 flex gap-5 items-start">
        <div class="bg-amber-500/20 p-3 rounded-2xl text-amber-500">
            <i data-lucide="shield-check" class="w-6 h-6"></i>
        </div>
        <div>
            <h4 class="text-amber-500 font-bold mb-1">Безопасный режим (Safe Mode)</h4>
            <p class="text-sm text-slate-300 leading-relaxed">
                Система игнорирует поля, которые уже переведены вручную или содержат уникальный текст. 
                DeepL будет вызван только для пустых или невыполненных переводов. Ваши правки в безопасности.
            </p>
        </div>
    </div>

    <!-- 🔄 LIVE STATUS PANEL -->
    <div id="statusContainer" class="hidden fade-in space-y-6">
        <div class="card-glass p-8 border-indigo-500/30">
            <div class="flex flex-col items-center text-center">
                <div id="spinner" class="mb-6">
                    <div class="relative w-20 h-20">
                        <div class="absolute inset-0 rounded-full border-4 border-indigo-500/20"></div>
                        <div class="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
                    </div>
                </div>
                
                <h2 id="statusTitle" class="text-2xl font-bold mb-2">Инициализация...</h2>
                <p id="statusDesc" class="text-slate-400 max-w-md mx-auto mb-8">
                    Идет подключение к серверам DeepL. Пожалуйста, не закрывайте вкладку.
                </p>

                <!-- Console Log Output -->
                <div id="outputLogWrapper" class="w-full hidden overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-inner">
                    <div class="px-5 py-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
                        <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Server Console Output</span>
                        <div class="flex gap-1.5">
                            <div class="w-2 h-2 rounded-full bg-white/10"></div>
                            <div class="w-2 h-2 rounded-full bg-white/10"></div>
                            <div class="w-2 h-2 rounded-full bg-white/10"></div>
                        </div>
                    </div>
                    <pre id="outputLog" class="p-6 text-indigo-300 text-xs font-mono text-left overflow-x-auto whitespace-pre-wrap max-h-96 custom-scrollbar"></pre>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
async function startTranslation(model) {
    const statusContainer = document.getElementById('statusContainer');
    const spinner = document.getElementById('spinner');
    const statusTitle = document.getElementById('statusTitle');
    const statusDesc = document.getElementById('statusDesc');
    const outputLogWrapper = document.getElementById('outputLogWrapper');
    const outputLog = document.getElementById('outputLog');

    statusContainer.classList.remove('hidden');
    spinner.classList.remove('hidden');
    outputLogWrapper.classList.add('hidden');
    outputLog.innerText = '';
    
    statusTitle.innerText = 'DeepL AI в работе...';
    statusDesc.innerText = 'Мы анализируем базу данных на наличие пустых полей. Это может занять некоторое время в зависимости от объема данных.';

    // Scroll to status
    statusContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

    try {
        const res = await fetch("{{ route('admin.translate.auto') }}", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            },
            body: JSON.stringify({ model: model })
        });

        const data = await res.json();
        spinner.classList.add('hidden');

        if (data.success) {
            statusTitle.innerText = '✨ Перевод завершен!';
            statusTitle.classList.add('text-emerald-400');
            statusDesc.innerText = data.message;
            if (data.output) {
                outputLogWrapper.classList.remove('hidden');
                outputLog.innerText = data.output;
            }
        } else {
            statusTitle.innerText = '🚨 Ошибка процесса';
            statusTitle.classList.add('text-red-400');
            statusDesc.innerText = data.message || 'Ошибка на стороне сервера.';
        }
    } catch (e) {
        spinner.classList.add('hidden');
        statusTitle.innerText = '⌛ Превышено время ожидания';
        statusDesc.innerText = 'Сервер всё еще может обрабатывать запрос на фоне, но браузер закрыл соединение из-за долгого ожидания.';
    }
}
</script>
@endsection