<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            ['slug' => 'about', 'title' => ['en' => 'About Us'], 'content' => ['en' => '<h2>About BeInPorn</h2><p>Welcome to BeInPorn. We review the best sites on the internet.</p>']],
            ['slug' => 'faq', 'title' => ['en' => 'FAQ'], 'content' => ['en' => '<h2>Frequently Asked Questions</h2><p>Here you will find answers to the most common questions.</p>']],
            ['slug' => 'disclaimer', 'title' => ['en' => 'Disclaimer'], 'content' => ['en' => '<h2>Disclaimer</h2><p>All content provided on this site is for informational purposes only.</p>']],
            ['slug' => '2257', 'title' => ['en' => '18 U.S.C. 2257'], 'content' => ['en' => '<h2>18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement</h2><p>All models appearing on this website were 18 years or older at the time of photography...</p>']],
            ['slug' => 'copyright', 'title' => ['en' => 'Copyright Policy'], 'content' => ['en' => '<h2>Copyright Policy & DMCA</h2><p>We respect the intellectual property rights of others. If you believe your copyright has been violated...</p>']],
            ['slug' => 'privacy', 'title' => ['en' => 'Privacy Policy'], 'content' => ['en' => '<h2>Privacy Policy</h2><p>Your privacy is critically important to us. This outlines how we handle data.</p>']],
            ['slug' => 'terms', 'title' => ['en' => 'Terms of Service'], 'content' => ['en' => '<h2>Terms of Service</h2><p>By accessing this website, you agree to be bound by these terms.</p>']],
            ['slug' => 'rta', 'title' => ['en' => 'RTA'], 'content' => ['en' => '<h2>Restricted to Adults</h2><p>This site contains adult material.</p>']]
        ];

        foreach ($pages as $index => $page) {
            \App\Models\Page::create([
                'slug' => $page['slug'],
                'title' => $page['title'],
                'content' => $page['content'],
                'is_active' => true,
                'position' => $index,
            ]);
        }
    }
}
