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
     * Перевод текста на один язык
     */
    public function translateSingle(string $text, string $sourceLang, string $targetLang): ?string
    {
        $response = Http::asForm()->timeout(15)->post($this->apiUrl, [
            'auth_key'    => $this->apiKey,
            'text'        => $text,
            'source_lang' => strtoupper($sourceLang),
            'target_lang' => strtoupper($targetLang),
        ]);

        if ($response->successful()) {
            return $response->json()['translations'][0]['text'] ?? null;
        }

        Log::error('DEEPL API error: ' . $response->body());
        return null;
    }

    /**
     * Получение списка языков, для которых перевод не удался
     */
    public function getFailedLanguages(): array
    {
        return $this->failed;
    }
}