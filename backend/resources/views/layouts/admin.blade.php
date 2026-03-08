<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <title>Admin Panel - UPX</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

    @stack('styles')
</head>
<body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

<div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <div id="sidebar"
         class="w-64 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col justify-between fixed z-40 h-full transform -translate-x-full md:translate-x-0 transition-transform duration-200 ease-in-out md:relative">

        <div class="flex flex-col h-full justify-between">
            <div>
                <!-- Logo & Theme Toggle -->
                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-300 dark:border-gray-700">
                    <div class="text-2xl font-bold tracking-wide">UPX</div>
                    <button id="theme-toggle" class="bg-gray-300 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm px-2 py-1 rounded-md">
                        <span id="theme-icon">🌙</span>
                    </button>
                </div>

                <!-- Menu Items -->
                <nav class="mt-4 px-2 space-y-1 text-sm">
                    <a href="{{ route('admin.dashboard') }}"
                       class="flex items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition {{ request()->routeIs('admin.dashboard') ? 'bg-gray-200 dark:bg-gray-800' : '' }}">
                        <i data-lucide="layout-dashboard" class="w-5 h-5 mr-3"></i>
                        Dashboard
                    </a>
                    <a href="{{ route('admin.categories.index') }}"
                       class="flex items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition {{ request()->routeIs('admin.categories.*') ? 'bg-gray-200 dark:bg-gray-800' : '' }}">
                        <i data-lucide="folder" class="w-5 h-5 mr-3"></i>
                        Categories
                    </a>
                    <a href="{{ route('admin.sites.index') }}" class="flex items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition">
                        <i data-lucide="link" class="w-5 h-5 mr-3"></i>
                        Sites
                    </a>

                    <a href="{{ route('admin.translate.form') }}" class="flex items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition">
                        <i data-lucide="globe" class="w-5 h-5 mr-3"></i>
                        Translate
                    </a>

                    
                    <a href="{{ route('admin.tags.index') }}" class="flex items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition">
                        <i data-lucide="tag" class="w-5 h-5 mr-3"></i>
                        Tags
                    </a>

                    <a href="#" class="flex items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition">
                        <i data-lucide="globe" class="w-5 h-5 mr-3"></i>
                        Countries
                    </a>
                </nav>
            </div>

            <!-- Bottom Settings -->
            <div class="px-2 pb-6 space-y-1 text-sm">
                <a href="#" class="flex items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition">
                    <i data-lucide="settings" class="w-5 h-5 mr-3"></i>
                    Settings
                </a>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="flex items-center w-full px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition">
                        <i data-lucide="log-out" class="w-5 h-5 mr-3"></i>
                        Logout
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- Overlay -->
    <div id="overlay" class="fixed inset-0 bg-black bg-opacity-50 z-30 hidden md:hidden" onclick="toggleSidebar()"></div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col h-screen overflow-y-auto">
        <!-- Mobile topbar -->
        <div class="md:hidden flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-900 border-b dark:border-gray-800">
            <button onclick="toggleSidebar()">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>
            <div class="text-xl font-semibold">UPX</div>
        </div>

        <!-- Page content -->
        <main class="p-4 lg:p-8">
            @if (!request()->routeIs('admin.dashboard'))
                @yield('breadcrumbs')
            @endif
            @yield('content')
        </main>
    </div>
</div>

<!-- Scripts -->
<script>
    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    }

    function setTheme(mode) {
        const html = document.documentElement;
        const icon = document.getElementById('theme-icon');

        if (mode === 'dark') {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            icon.textContent = '☀️';
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            icon.textContent = '🌙';
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        setTheme(currentTheme);

        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const isDark = document.documentElement.classList.contains('dark');
                setTheme(isDark ? 'light' : 'dark');
            });
        }
    });
</script>

@stack('scripts')
</body>
</html>
