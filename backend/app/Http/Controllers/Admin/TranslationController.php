<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Site;
use App\Services\DeeplTranslationService;
use Illuminate\Support\Facades\Log;

class TranslationController extends Controller
{
    public function autoTranslate(Request $request)
    {
        set_time_limit(300);

        $deepl = new DeeplTranslationService();

        $languages = ['uk', 'es', 'de', 'fr', 'ru', 'tr', 'zh', 'ar', 'hi', 'ja', 'ko', 'pt', 'pl', 'it', 'nl', 'sv', 'fi', 'no', 'da', 'cs', 'ro', 'el', 'vi', 'id', 'he', 'hu', 'th'];
        $failed = [];

        // 🔁 Переводим категории
        foreach (Category::all() as $category) {
            foreach ($languages as $lang) {
                foreach ([
                    'name',
                    'description',
                    'seo_title',
                    'seo_description',
                    'disclaimer'
                ] as $field) {

                    $original = $category->getTranslation($field, 'en');
                    if (!$original) continue;

                    if ($category->hasTranslation($field, $lang)) continue; // уже переведено

                    try {
                        $translated = $deepl->translateSingle($original, 'EN', $lang);
                        $category->setTranslation($field, $lang, $translated);
                    } catch (\Throwable $e) {
                        $failed[] = "Category {$category->id} field {$field} lang {$lang}: {$e->getMessage()}";
                        Log::error(end($failed));
                    }

                    usleep(300000); // 0.3 сек
                }
            }
            $category->save();
        }

        // 🔁 Переводим сайты
        foreach (Site::all() as $site) {
            foreach ($languages as $lang) {
                foreach ([
                    'description',
                    'review',
                    'pros',
                    'cons',
                    'seo_title',
                    'seo_description'
                ] as $field) {

                    $original = $site->getTranslation($field, 'en');
                    if (!$original) continue;

                    if ($site->hasTranslation($field, $lang)) continue;

                    try {
                        if (is_array($original)) {
                            $translatedArray = [];
                            foreach ($original as $item) {
                                $translatedArray[] = $deepl->translateSingle($item, 'EN', $lang);
                                usleep(300000);
                            }
                            $site->setTranslation($field, $lang, $translatedArray);
                        } else {
                            $translated = $deepl->translateSingle($original, 'EN', $lang);
                            $site->setTranslation($field, $lang, $translated);
                            usleep(300000);
                        }
                    } catch (\Throwable $e) {
                        $failed[] = "Site {$site->id} field {$field} lang {$lang}: {$e->getMessage()}";
                        Log::error(end($failed));
                    }
                }
            }
            $site->save();
        }

        return response()->json([
            'success' => true,
            'errors' => $failed,
            'message' => count($failed) ? 'Переводы выполнены с ошибками' : 'Все успешно переведено'
        ]);
    }
}