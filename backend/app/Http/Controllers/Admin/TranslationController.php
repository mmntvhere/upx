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
                    'name' => 'name_translations',
                    'description' => 'description_translations',
                    'seo_title' => 'seo_title_translations',
                    'seo_description' => 'seo_description_translations',
                    'disclaimer' => 'disclaimer_translations'
                ] as $field => $translationField) {

                    $original = $category->{$field};
                    if (!$original) continue;

                    $translations = $category->{$translationField} ?? [];

                    if (isset($translations[$lang])) continue; // уже переведено

                    try {
                        $translated = $deepl->translateSingle($original, 'EN', $lang);
                        $translations[$lang] = $translated;
                        $category->{$translationField} = $translations;
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
                    'description' => 'description_translations',
                    'review' => 'review_translations',
                    'pros' => 'pros_translations',
                    'cons' => 'cons_translations',
                    'seo_title' => 'seo_title_translations',
                    'seo_description' => 'seo_description_translations'
                ] as $field => $translationField) {

                    $original = $site->{$field};
                    if (!$original) continue;

                    $translations = $site->{$translationField} ?? [];

                    if (isset($translations[$lang])) continue;

                    try {
                        if (is_array($original)) {
                            $translatedArray = [];
                            foreach ($original as $item) {
                                $translatedArray[] = $deepl->translateSingle($item, 'EN', $lang);
                                usleep(300000);
                            }
                            $translations[$lang] = $translatedArray;
                        } else {
                            $translations[$lang] = $deepl->translateSingle($original, 'EN', $lang);
                            usleep(300000);
                        }

                        $site->{$translationField} = $translations;
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