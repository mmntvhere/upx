<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DeeplTranslationService
{
    protected string $apiKey;
    protected string $apiUrl = 'https://api-free.deepl.com/v2/translate';
    protected array $failed = [];

    public function __construct()
    {
        $this->apiKey = config('services.deepl.api_key');

        if (!$this->apiKey) {
            throw new \Exception('DEEPL API key is not set in services.deepl.api_key');
        }
    }

    /**
     * Перевод текста на несколько языков
     */
    public function translateMany(string $sourceText, string $sourceLang = 'EN', array $targetLangs = []): array
    {
        $translations = [];

        foreach ($targetLangs as $lang) {
            try {
                $translated = $this->translateSingle($sourceText, $sourceLang, $lang);
                if ($translated) {
                    $translations[$lang] = $translated;
                } else {
                    $this->failed[] = $lang;
                }
            } catch (\Throwable $e) {
                $this->failed[] = $lang;
                Log::error("DEEPL error for lang $lang: " . $e->getMessage());
            }
        }

        return $translations;
    }

    /**
     * Перевод текста или HTML на один язык
     */
    public function translateSingle(string $text, string $sourceLang, string $targetLang): ?string
    {
        $response = Http::withHeaders([
            'Authorization' => "DeepL-Auth-Key {$this->apiKey}",
        ])->timeout(20)->post($this->apiUrl, [
            'text'        => [$text],
            'source_lang' => strtoupper($sourceLang),
            'target_lang' => strtoupper($targetLang),
            'tag_handling'=> 'html', // 🔴 КРИТИЧЕСКИ ВАЖНО: сохраняет структуру тегов
        ]);

        if ($response->successful()) {
            return $response->json()['translations'][0]['text'] ?? null;
        }

        Log::error("DEEPL API error [{$targetLang}]: " . $response->body());
        return null;
    }

    /**
     * Оптимизированный перевод массива строк (например, плюсы/минусы) за 1 запрос
     */
    public function translateArray(array $texts, string $sourceLang, string $targetLang): array
    {
        if (empty($texts)) return [];

        $response = Http::withHeaders([
            'Authorization' => "DeepL-Auth-Key {$this->apiKey}",
        ])->timeout(30)->post($this->apiUrl, [
            'text'        => $texts,
            'source_lang' => strtoupper($sourceLang),
            'target_lang' => strtoupper($targetLang),
            'tag_handling'=> 'html', 
        ]);

        if ($response->successful()) {
            $translations = $response->json()['translations'] ?? [];
            return array_column($translations, 'text');
        }

        Log::error("DEEPL API error [Array to {$targetLang}]: " . $response->body());
        return [];
    }


    /**
     * Получение списка языков, для которых перевод не удался
     */
    public function getFailedLanguages(): array
    {
        return $this->failed;
    }
}