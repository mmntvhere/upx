<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SiteSortController extends Controller
{
    public function sort(Request $request)
    {
        $order = $request->input('order'); // [ { id: 5, position: 1 }, ... ]
        $locale = $request->input('locale', 'en');

        if (!is_array($order)) {
            return response()->json(['error' => 'Invalid data format'], 422);
        }

        // 🚀 Оптимизация: загружаем все сайты одним запросом (предотвращаем N+1)
        $ids = collect($order)->pluck('id')->toArray();
        $sites = Site::whereIn('id', $ids)->get()->keyBy('id');

        foreach ($order as $item) {
            $site = $sites->get($item['id']);
            if ($site) {
                $site->setPositionForLocale($locale, $item['position']);
                if ($locale === 'en') {
                    $site->position = $item['position'];
                }
                $site->save();
            }
        }

        // 🚀 Очищаем кэш категорий для этого языка, чтобы изменения на главной были видны сразу
        Cache::forget("categories.active.{$locale}.v2");

        return response()->json(['message' => 'Позиции обновлены для языка ' . $locale]);
    }
}