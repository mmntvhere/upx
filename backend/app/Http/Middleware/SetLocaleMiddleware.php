<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocaleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Приоритет - query параметр ?lang=
        $locale = $request->query('lang');

        // 2. Если нет в query, смотрим заголовок Accept-Language
        if (!$locale) {
            $locale = $request->header('Accept-Language');
        }

        // 3. Берем только первые 2 буквы (en-US -> en)
        $locale = strtolower(substr($locale ?? 'en', 0, 2));

        // 4. Проверяем валидность (только если есть конфиг, иначе дефолт)
        $allowed = config('languages.codes', ['en', 'uk', 'ru']);
        if (!in_array($locale, $allowed)) {
            $locale = 'en';
        }

        app()->setLocale($locale);

        return $next($request);
    }
}
