<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Category;
use App\Models\Site;
use App\Services\DeeplTranslationService;

class TranslateContentCommand extends Command
{
    /**
     * Имя команды для запуска из консоли.
     * Можно указать конкретную модель: php artisan translate:content --model=category
     */
    protected $signature = 'translate:content {--model=all : Модель для перевода (all, site, category)}';

    /**
     * Описание команды
     */
    protected $description = 'Массовый атоматический перевод недостающего контента через DeepL API (с сохранением HTML)';

    public function handle(DeeplTranslationService $deepl)
    {
        // 🌍 Собираем все поддерживаемые языки из конфига, исключая английский
        $configLangs = config('languages.supported', []);
        $languages = array_keys($configLangs);
        $languages = array_values(array_filter($languages, fn($l) => $l !== 'en'));

        if (empty($languages)) {
            $this->error('В конфигурации нет доступных языков для перевода!');
            return 1;
        }

        $this->info("🚀 Запуск массового перевода на " . count($languages) . " языков...");

        $model = $this->option('model');

        if ($model === 'all' || $model === 'category') {
            $this->translateCategories($deepl, $languages);
        }

        if ($model === 'all' || $model === 'site') {
            $this->translateSites($deepl, $languages);
        }

        $this->info("✅ Процесс массового перевода успешно завершен!");
        return 0;
    }

    protected function translateCategories(DeeplTranslationService $deepl, array $languages)
    {
        $categories = Category::all();
        $this->info("Перевод Категорий...");
        $bar = $this->output->createProgressBar(count($categories));

        foreach ($categories as $category) {
            foreach ($languages as $lang) {
                foreach (['name', 'description', 'seo_title', 'seo_description', 'disclaimer'] as $field) {
                    
                    $original = $category->getTranslation($field, 'en', false); // false = не использовать fallback
                    if (empty($original)) continue;

                    // Если перевод уже есть - пропускаем
                    if ($category->hasTranslation($field, $lang) && !empty($category->getTranslation($field, $lang))) {
                        continue;
                    }

                    try {
                        $translated = $deepl->translateSingle($original, 'EN', $lang);
                        if ($translated) {
                            $category->setTranslation($field, $lang, $translated);
                        }
                        usleep(100000); // 100ms пауза между запросами для безопасности
                    } catch (\Throwable $e) {
                        $this->error(" Ошибка перевода категории {$category->id} ({$lang}): " . $e->getMessage());
                    }
                }
            }
            $category->save();
            $bar->advance();
        }
        $bar->finish();
        $this->newLine(2);
    }

    protected function translateSites(DeeplTranslationService $deepl, array $languages)
    {
        $sites = Site::all();
        $this->info("Перевод Сайтов...");
        $bar = $this->output->createProgressBar(count($sites));

        foreach ($sites as $site) {
            foreach ($languages as $lang) {
                
                // 📝 1. Текстовые и HTML поля
                foreach (['description', 'review', 'seo_title', 'seo_description'] as $field) {
                    $original = $site->getTranslation($field, 'en', false);
                    if (empty($original)) continue;

                    if ($site->hasTranslation($field, $lang) && !empty($site->getTranslation($field, $lang))) {
                        continue;
                    }

                    try {
                        $translated = $deepl->translateSingle($original, 'EN', $lang);
                        if ($translated) {
                            $site->setTranslation($field, $lang, $translated);
                        }
                        usleep(100000);
                    } catch (\Throwable $e) {
                        $this->error("\nОшибка перевода поля {$field} у сайта {$site->id} ({$lang}): " . $e->getMessage());
                    }
                }

                // 📦 2. Массивы (Плюсы и Минусы) -> переводим за ОДИН HTTP запрос
                foreach (['pros', 'cons'] as $field) {
                    $original = $site->getTranslation($field, 'en', false);
                    
                    if (empty($original) || !is_array($original)) continue;

                    if ($site->hasTranslation($field, $lang) && !empty($site->getTranslation($field, $lang))) {
                        continue;
                    }

                    try {
                        $translatedArray = $deepl->translateArray($original, 'EN', $lang);
                        if (!empty($translatedArray)) {
                            $site->setTranslation($field, $lang, $translatedArray);
                        }
                        usleep(100000);
                    } catch (\Throwable $e) {
                        $this->error("\nОшибка перевода массива {$field} у сайта {$site->id} ({$lang}): " . $e->getMessage());
                    }
                }
            }
            $site->save();
            $bar->advance();
        }
        $bar->finish();
        $this->newLine(2);
    }
}
