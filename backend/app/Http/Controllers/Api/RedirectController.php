<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RedirectController extends Controller
{
    /**
     * Обрабатывает переход на внешний сайт с записью статистики
     */
    public function go(Request $request, $slug)
    {
        $site = Site::where('slug', $slug)->firstOrFail();

        // 1. Записываем клик в БД (асинхронно/в очередь в идеале, но для начала так)
        try {
            DB::table('site_clicks')->insert([
                'site_id' => $site->id,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'referer' => $request->headers->get('referer'),
                'locale' => app()->getLocale(),
                'position' => $request->query('pos'), // Можно передавать ?pos=card
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } catch (\Exception $e) {
            // Ошибки записи статистики не должны прерывать редирект
            \Log::error("Click tracking failed for site {$site->id}: " . $e->getMessage());
        }

        // 2. Получаем финальную ссылку
        $finalUrl = $site->link;
        $affUrl = trim((string)$site->affiliate_url);

        if (!empty($affUrl)) {
            if (str_starts_with($affUrl, 'http')) {
                $finalUrl = $affUrl;
            } else {
                // Это хэш
                $separator = str_contains($finalUrl, '?') ? '&' : '?';
                $finalUrl .= $separator . 'ref=' . $affUrl;
            }
        } else {
            // Стандартный реф
            $separator = str_contains($finalUrl, '?') ? '&' : '?';
            $finalUrl .= $separator . 'ref=beinporn';
        }

        // 3. Выполняем 302 Редирект
        return redirect()->away($finalUrl, 302);
    }
}
