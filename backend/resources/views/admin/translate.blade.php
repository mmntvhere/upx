@extends('layouts.admin')

@section('breadcrumbs')
    <x-admin.breadcrumbs :items="[
        ['label' => 'Auto Translation']
    ]" />
@endsection

@section('content')
<div class="max-w-4xl mx-auto mt-6">
    <div class="bg-white dark:bg-gray-800 shadow rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <!-- 🎯 Hero Header -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white relative">
            <h1 class="text-3xl font-extrabold mb-2 flex items-center gap-3 relative z-10">
                <svg class="w-8 h-8 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                Мощный авто-перевод от DeepL 🚀
            </h1>
            <p class="text-blue-100 text-lg relative z-10 opacity-90 max-w-xl">
                Использует современную интеграцию для массового перевода пустых полей в базе данных (Сайты и Категории) с сохранением HTML-верстки.
            </p>
        </div>

        <div class="p-8">
            <!-- ⚡ Action Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <!-- Категории -->
                <div class="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow bg-blue-50/50 dark:bg-gray-800/50">
                    <div class="flex items-start justify-between mb-4">
                        <div class="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">Перевести Категории</h3>
                    <p class="text-gray-500 dark:text-gray-400 mb-6 text-sm h-10">Быстрый перевод всех пустых названий и описаний категорий на 27 языков.</p>
                    <button onclick="startTranslation('category')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors flex justify-center items-center gap-2">
                        Запуск (Категории)
                    </button>
                </div>
                
                <!-- Сайты -->
                <div class="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow bg-indigo-50/50 dark:bg-gray-800/50">
                    <div class="flex items-start justify-between mb-4">
                        <div class="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg text-indigo-600 dark:text-indigo-400">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">Перевести Сайты</h3>
                    <p class="text-gray-500 dark:text-gray-400 mb-6 text-sm h-10">Тяжелый пакетный перевод обзоров, плюсов/минусов и SEO полей для сайтов.</p>
                    <button onclick="startTranslation('site')" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors flex justify-center items-center gap-2">
                        Запуск (Сайты)
                    </button>
                </div>
            </div>

            <!-- ИНФОРМАЦИЯ -->
            <div class="bg-orange-50 dark:bg-gray-900 border border-orange-200 dark:border-gray-700 rounded-lg p-4 flex gap-3 text-sm">
                <svg class="w-6 h-6 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div class="text-orange-900 dark:text-gray-300">
                    <strong>Безопасный режим:</strong> Скрипт переводит только пустые поля и игнорирует английский. Ручные переводы никогда не затираются. Вы можете безопасно нажимать кнопки хоть 100 раз.
                </div>
            </div>

            <!-- 🔄 STATUS BLOCK (Hidden by default) -->
            <div id="statusContainer" class="hidden mt-8 rounded-xl p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-inner">
                <div class="flex items-start gap-4">
                    <div id="spinner" class="mt-1 flex-shrink-0">
                        <svg class="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                    <div class="flex-1 w-full overflow-hidden">
                        <h4 id="statusTitle" class="text-lg font-bold text-gray-800 dark:text-white">Обработка...</h4>
                        <p id="statusDesc" class="text-gray-500 dark:text-gray-400 mt-1 text-sm">Не закрывайте окно до появления зеленой галочки.</p>
                        
                        <!-- 📜 Логи скрипта -->
                        <div id="outputLogWrapper" class="mt-4 hidden bg-gray-900 rounded-lg shadow-inner overflow-hidden border border-gray-700">
                            <div class="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
                                <span class="text-xs text-gray-400 font-mono">Terminal Output</span>
                            </div>
                            <pre id="outputLog" class="p-4 text-green-400 text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-64 scrollbar-thin scrollbar-thumb-gray-600"></pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
async function startTranslation(model) {
    // UI Элементы
    const statusContainer = document.getElementById('statusContainer');
    const spinner = document.getElementById('spinner');
    const statusTitle = document.getElementById('statusTitle');
    const statusDesc = document.getElementById('statusDesc');
    const outputLogWrapper = document.getElementById('outputLogWrapper');
    const outputLog = document.getElementById('outputLog');

    // Сброс UI перед запуском
    statusContainer.classList.remove('hidden');
    spinner.classList.remove('hidden');
    statusTitle.innerText = model === 'site' ? '🗄️ Перевод Сайтов в процессе...' : '🗂️ Перевод Категорий в процессе...';
    statusTitle.className = 'text-lg font-bold text-gray-800 dark:text-white';
    statusDesc.innerText = "Подключение к DeepL API и обход базы данных. Это может занять несколько минут.";
    outputLogWrapper.classList.add('hidden');
    outputLog.innerText = '';

    // Блокировка кнопок
    const buttons = document.querySelectorAll('button');
    buttons.forEach(b => {
        b.disabled = true;
        b.classList.add('opacity-50', 'cursor-not-allowed');
    });

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
            statusTitle.innerText = '✅ Успех!';
            statusTitle.className = 'text-lg font-bold text-green-600 dark:text-green-500';
            statusDesc.innerText = data.message;
            if (data.output) {
                outputLogWrapper.classList.remove('hidden');
                outputLog.innerText = data.output;
            }
        } else {
            statusTitle.innerText = '⚠️ Процесс завершился с ошибкой';
            statusTitle.className = 'text-lg font-bold text-red-600 dark:text-red-500';
            statusDesc.innerText = data.message || 'Сбой на сервере';
        }
    } catch (e) {
        spinner.classList.add('hidden');
        statusTitle.innerText = '❌ Обрыв связи (504 Timeout)';
        statusTitle.className = 'text-lg font-bold text-red-600 dark:text-red-500';
        statusDesc.innerText = 'Скорее всего база слишком большая и браузер закрыл соединение. Перевод может всё ещё продолжаться на фоне сервера.';
    }

    // Разблокировка кнопок
    buttons.forEach(b => {
        b.disabled = false;
        b.classList.remove('opacity-50', 'cursor-not-allowed');
    });
}
</script>
@endsection