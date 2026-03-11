<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class TranslationController extends Controller
{
    public function autoTranslate(Request $request)
    {
        // 🚀 Отключаем тайм-ауты
        set_time_limit(0);

        $model = $request->input('model', 'all');

        try {
            // Запускаем консольную команду программно и ждем её завершения
            Artisan::call('translate:content', ['--model' => $model]);
            
            // Вытягиваем вывод консоли (прогресс-бар и логи)
            $output = Artisan::output();

            return response()->json([
                'success' => true,
                'message' => "Успешно: контент ($model) переведен.",
                'output' => $output
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Перевод конкретного объекта на один выбранный язык.
     */
    public function translateSingle(Request $request, \App\Services\DeeplTranslationService $deepl)
    {
        $validated = $request->validate([
            'model_type' => 'required|in:site,category,page',
            'model_id'   => 'required|integer',
            'target_lang'=> 'required|string|size:2'
        ]);

        $modelClass = match ($validated['model_type']) {
            'site' => \App\Models\Site::class,
            'category' => \App\Models\Category::class,
            'page' => \App\Models\Page::class,
        };

        $model = $modelClass::findOrFail($validated['model_id']);
        $lang = $validated['target_lang'];

        // Поля для перевода
        $fields = match ($validated['model_type']) {
            'site' => ['description', 'review', 'seo_title', 'seo_description'],
            'category' => ['name', 'description', 'seo_title', 'seo_description', 'disclaimer'],
            'page' => ['title', 'content', 'seo_title', 'seo_description'],
        };

        $results = [];

        foreach ($fields as $field) {
            $original = $model->getTranslation($field, 'en', false);
            if (empty($original)) continue;

            try {
                $translated = $deepl->translateSingle($original, 'EN', $lang);
                if ($translated) {
                    $model->setTranslation($field, $lang, $translated);
                    $results[$field] = $translated;
                }
            } catch (\Exception $e) {
                // Игнорируем ошибки конкретных полей, чтобы перевести остальные
            }
        }

        // Плюсы/Минусы отдельно (для сайтов)
        if ($validated['model_type'] === 'site') {
            foreach (['pros', 'cons'] as $field) {
                $original = $model->getTranslation($field, 'en', false);
                if (empty($original)) continue;

                try {
                    $translated = $deepl->translateArray((array)$original, 'EN', $lang);
                    if ($translated) {
                        $model->setTranslation($field, $lang, $translated);
                        $results[$field] = $translated;
                    }
                } catch (\Exception $e) {}
            }
        }

        $model->save();

        return response()->json([
            'success' => true,
            'translations' => $results
        ]);
    }
}