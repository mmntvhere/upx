<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Site;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index()
    {
        $domain = env('FRONTEND_URL', 'https://beinporn.com');
        $supportedLanguages = config('languages.codes');
        
        $urls = [];

        // 1. Homepage Base
        $this->addUrlGroup($urls, $domain, '', $supportedLanguages);

        // 2. Categories
        $categories = Category::where('is_active', true)->get();
        foreach ($categories as $category) {
            $this->addUrlGroup($urls, $domain, '/' . $category->slug, $supportedLanguages);
        }

        // 2.5 Pages (FAQ, Terms, etc.)
        $pages = \App\Models\Page::where('is_active', true)->get();
        foreach ($pages as $page) {
            $this->addUrlGroup($urls, $domain, '/' . $page->slug, $supportedLanguages);
        }

        // 3. Sites (Reviews)
        $sites = Site::where('is_active', true)->get();
        foreach ($sites as $site) {
            // Sites with specific enabled_languages should only generate those + 'en' fallback if null
            $languages = empty($site->enabled_languages) 
                         ? $supportedLanguages 
                         : $site->enabled_languages;

            $this->addUrlGroup($urls, $domain, '/review/' . $site->slug, $languages);
        }

        // Generate XML
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' .
                'xmlns:xhtml="http://www.w3.org/1999/xhtml">' . "\n";

        foreach ($urls as $urlData) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$urlData['loc']}</loc>\n";
            
            foreach ($urlData['alternates'] as $alt) {
                $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"{$alt['hreflang']}\" href=\"{$alt['href']}\"/>\n";
            }
            
            // x-default is always English for our setup
            $xml .= "    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"{$urlData['x_default']}\"/>\n";
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'text/xml');
    }

    private function addUrlGroup(&$urls, $domain, $path, $languages)
    {
        // For each language the resource supports, we create a primary <url> block
        foreach ($languages as $lang) {
            // The English version has no prefix
            $prefix = ($lang === 'en') ? '' : '/' . $lang;
            $loc = $domain . $prefix . $path;
            
            $alternates = [];
            foreach ($languages as $altLang) {
                $altPrefix = ($altLang === 'en') ? '' : '/' . $altLang;
                $alternates[] = [
                    'hreflang' => $altLang,
                    'href' => $domain . $altPrefix . $path
                ];
            }

            $urls[] = [
                'loc' => $loc,
                'alternates' => $alternates,
                'x_default' => $domain . $path // English is x-default root
            ];
        }
    }
}
