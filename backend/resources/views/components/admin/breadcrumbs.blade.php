@props(['items' => []])

@if (!empty($items))
    <nav class="text-sm text-gray-600 dark:text-gray-300 mb-4">
        <ol class="flex items-center space-x-2">
            <li>
                <a href="{{ route('admin.dashboard') }}" class="flex items-center px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition">
                    <i data-lucide="home" class="w-4 h-4 mr-1"></i>
                    Home
                </a>
            </li>
            @foreach ($items as $item)
                <li>
                    <span class="mx-1 text-gray-400 dark:text-gray-500">/</span>
                </li>
                <li>
                    @if (!$loop->last)
                        <a href="{{ $item['url'] }}"
                           class="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition">
                            {{ $item['label'] }}
                        </a>
                    @else
                        <span class="px-3 py-1 rounded-full bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-white font-semibold">
                            {{ $item['label'] }}
                        </span>
                    @endif
                </li>
            @endforeach
        </ol>
    </nav>
@endif
