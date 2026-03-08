<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Http\Request;

class SiteSortController extends Controller
{
    public function sort(Request $request)
    {
        $order = $request->input('order'); // [ { id: 5, position: 1 }, ... ]
        $locale = $request->input('locale', 'en'); // Получаем текущий язык (например 'uk', 'es')

        if (!is_array($order)) {
            return response()->json(['error' => 'Invalid data format'], 422);
        }

        foreach ($order as $item) {
            $site = Site::find($item['id']);

            if ($site) {
                // Обновляем позицию ТОЛЬКО для текущего языка
                $site->setPositionForLocale($locale, $item['position']);
                $site->save();
            }
        }

        return response()->json(['message' => 'Позиции обновлены для языка ' . $locale]);
    }
}