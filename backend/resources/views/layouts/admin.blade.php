<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <title>BeInPorn — Premium Admin Experience</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script src="https://unpkg.com/lucide@latest"></script>

    <style>
        :root {
            --glass-bg: rgba(255, 255, 255, 0.03);
            --glass-border: rgba(255, 255, 255, 0.08);
            --accent-primary: #6366f1;
            --accent-secondary: #a855f7;
            --sidebar-width: 280px;
        }

        body {
            font-family: 'Outfit', sans-serif;
            background: #020617;
            background-image: 
                radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.15) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.15) 0px, transparent 50%);
            min-height: 100vh;
            color: #f8fafc;
        }

        /* Glassmorphism Sidebar */
        .sidebar-glass {
            background: rgba(15, 23, 42, 0.7);
            backdrop-filter: blur(20px);
            border-right: 1px solid var(--glass-border);
            box-shadow: 10px 0 30px rgba(0,0,0,0.3);
        }

        /* Nav Links */
        .nav-link {
            position: relative;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            color: #94a3b8;
        }
        .nav-link:hover {
            color: #fff;
            background: rgba(255,255,255,0.05);
            transform: translateX(5px);
        }
        .nav-link.active {
            color: #fff;
            background: linear-gradient(90deg, rgba(99, 102, 241, 0.2) 0%, transparent 100%);
            border-left: 3px solid var(--accent-primary);
        }

        /* Hero Cards */
        .card-glass {
            background: var(--glass-bg);
            backdrop-filter: blur(12px);
            border: 1px solid var(--glass-border);
            border-radius: 24px;
            transition: all 0.4s ease;
        }
        .card-glass:hover {
            border-color: rgba(99, 102, 241, 0.4);
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

        /* Fancy Inputs */
        input, select, textarea {
            background: rgba(0,0,0,0.2) !important;
            border: 1px solid rgba(255,255,255,0.1) !important;
            backdrop-filter: blur(5px);
            border-radius: 12px !important;
            transition: border-color 0.3s ease;
        }
        input:focus {
            border-color: var(--accent-primary) !important;
            ring: 2px solid rgba(99, 102, 241, 0.3) !important;
        }

        .liquid-gradient {
            background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    </style>

    @stack('styles')
</head>
<body class="antialiased">

<div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <aside id="sidebar" class="sidebar-glass w-[280px] flex flex-col fixed z-50 h-full transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-out lg:relative">
        
        <!-- Logo Area -->
        <div class="p-8 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <i data-lucide="zap" class="text-white w-6 h-6"></i>
                </div>
                <span class="text-2xl font-extrabold tracking-tight liquid-gradient">BeInPorn Admin</span>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
            <div class="text-[10px] font-bold text-slate-500 uppercase tracking-[2px] px-4 mb-4">Main Navigation</div>
            
            <a href="{{ route('admin.dashboard') }}" 
               class="nav-link flex items-center px-4 py-3 rounded-xl text-sm font-medium {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                <i data-lucide="layout-grid" class="w-5 h-5 mr-3"></i>
                Dashboard
            </a>

            <a href="{{ route('admin.categories.index') }}" 
               class="nav-link flex items-center px-4 py-3 rounded-xl text-sm font-medium {{ request()->routeIs('admin.categories.*') ? 'active' : '' }}">
                <i data-lucide="layers" class="w-5 h-5 mr-3"></i>
                Categories
            </a>

            <a href="{{ route('admin.sites.index') }}" 
               class="nav-link flex items-center px-4 py-3 rounded-xl text-sm font-medium {{ request()->routeIs('admin.sites.*') ? 'active' : '' }}">
                <i data-lucide="monitor" class="w-5 h-5 mr-3"></i>
                Sites Management
            </a>

            <a href="{{ route('admin.banners.index') }}" 
               class="nav-link flex items-center px-4 py-3 rounded-xl text-sm font-medium {{ request()->routeIs('admin.banners.*') ? 'active' : '' }}">
                <i data-lucide="image" class="w-5 h-5 mr-3"></i>
                Visual Banners
            </a>

            <a href="{{ route('admin.pages.index') }}" 
               class="nav-link flex items-center px-4 py-3 rounded-xl text-sm font-medium {{ request()->routeIs('admin.pages.*') ? 'active' : '' }}">
                <i data-lucide="file-code" class="w-5 h-5 mr-3"></i>
                Static Content
            </a>

            <a href="{{ route('admin.translate.form') }}" 
               class="nav-link flex items-center px-4 py-3 rounded-xl text-sm font-medium {{ request()->routeIs('admin.translate.*') ? 'active' : '' }}">
                <i data-lucide="languages" class="w-5 h-5 mr-3"></i>
                AI Translation Hub
            </a>

            <div class="pt-8 text-[10px] font-bold text-slate-500 uppercase tracking-[2px] px-4 mb-4">Extras</div>

            <a href="{{ route('admin.tags.index') }}" class="nav-link flex items-center px-4 py-3 rounded-xl text-sm font-medium">
                <i data-lucide="tag" class="w-5 h-5 mr-3"></i>
                Taxonomy Tags
            </a>
        </nav>

        <!-- User Profile Bottom -->
        <div class="p-4 border-t border-white/5">
            <div class="bg-white/5 rounded-2xl p-4">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold">
                        YU
                    </div>
                    <div class="overflow-hidden">
                        <p class="text-sm font-bold truncate">Yurii Mamontov</p>
                        <p class="text-[10px] text-slate-400">System Administrator</p>
                    </div>
                </div>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 py-2.5 rounded-xl text-xs font-bold transition-all">
                        <i data-lucide="power" class="w-4 h-4"></i>
                        Sign Out
                    </button>
                </form>
            </div>
        </div>
    </aside>

    <!-- Overlay for Mobile -->
    <div id="overlay" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 hidden lg:hidden" onclick="toggleSidebar()"></div>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden">
        
        <!-- Navbar -->
        <header class="h-20 border-b border-white/5 flex items-center justify-between px-8 backdrop-blur-md sticky top-0 z-30">
            <div class="flex items-center gap-4">
                <button onclick="toggleSidebar()" class="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <i data-lucide="menu" class="w-6 h-6"></i>
                </button>
                <div class="hidden lg:block">
                    <h2 class="text-sm font-medium text-slate-400">Welcome back, Admin 👋</h2>
                </div>
            </div>

            <div class="flex items-center gap-6">
                <button class="relative p-2 hover:bg-white/5 rounded-full transition-colors group">
                    <i data-lucide="bell" class="w-5 h-5 text-slate-400 group-hover:text-white"></i>
                    <span class="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
                    <span class="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full"></span>
                </button>
                <div class="h-8 w-[1px] bg-white/10"></div>
                <div class="flex items-center gap-3">
                    <span class="text-xs font-semibold text-slate-300">v2.1.0-stable</span>
                </div>
            </div>
        </header>

        <!-- Dynamic Content -->
        <main class="p-8 pb-20">
            @if (!request()->routeIs('admin.dashboard'))
                <div class="mb-8">
                    @yield('breadcrumbs')
                </div>
            @endif

            <div class="fade-in-up">
                @if(session('success'))
                    <div class="mb-6 card-glass border-green-500/30 bg-green-500/5 p-4 flex items-center gap-3 text-green-400">
                        <i data-lucide="check-circle" class="w-5 h-5"></i>
                        <span class="text-sm font-medium">{{ session('success') }}</span>
                    </div>
                @endif

                @yield('content')
            </div>
        </main>

        <!-- Footer -->
        <footer class="mt-auto p-8 border-t border-white/5 text-center">
            <p class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                &copy; {{ date('Y') }} BeInPorn High-Performance CMS. Crafted with Passion.
            </p>
        </footer>
    </div>
</div>

<script>
    // Lucide Init
    lucide.createIcons();

    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    }

    // Smooth page appearance
    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('ready');
    });
</script>

@stack('scripts')
</body>
</html>
