@extends('layouts.admin')

@section('content')
<div class="max-w-xl mx-auto mt-10 bg-white shadow rounded-lg p-6">
    <h1 class="text-xl font-bold mb-4">Автоматический перевод категорий</h1>

    <form id="translateForm">
        <label class="block mb-2 font-medium text-gray-700" for="deeplKey">Вставьте API-ключ Deepl:</label>
        <input type="text" id="deeplKey" name="deeplKey" class="w-full border border-gray-300 rounded px-3 py-2 mb-4" required>

        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Перевести
        </button>
    </form>

    <div id="translationStatus" class="mt-4 text-sm text-gray-800"></div>
</div>

<script>
document.getElementById('translateForm').addEventListener('submit', async function(e) {
    e.preventDefault()

    const key = document.getElementById('deeplKey').value
    const status = document.getElementById('translationStatus')
    status.innerText = '⏳ Перевод начался...'

    const res = await fetch("{{ route('admin.translate.auto') }}", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': '{{ csrf_token() }}'
        },
        body: JSON.stringify({ deepl_key: key })
    })

    const data = await res.json()
    if (data.success) {
        status.innerText = '✅ Перевод завершён успешно!'
    } else {
        status.innerText = '❌ Ошибка: ' + (data.message || 'Что-то пошло не так')
    }
})
</script>
@endsection