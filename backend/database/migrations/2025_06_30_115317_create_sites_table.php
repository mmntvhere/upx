<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sites', function (Blueprint $table) {
            $table->id();
            $table->json('name'); // Translatable name
            $table->string('slug')->unique();
            $table->json('description')->nullable(); // Translatable description
            $table->json('seo_title')->nullable(); // Translatable SEO title
            $table->json('seo_description')->nullable(); // Translatable SEO description
            $table->json('review')->nullable(); // Translatable review
            $table->json('pros')->nullable(); // Translatable pros
            $table->json('cons')->nullable(); // Translatable cons
            $table->decimal('rating', 3, 1)->default(0);
            $table->integer('position')->default(100);
            $table->json('position_per_lang')->nullable();
            $table->string('preview')->nullable();
            $table->string('favicon')->nullable();
            $table->string('main_image')->nullable();
            $table->string('link');
            $table->string('affiliate_url')->nullable();
            $table->json('enabled_languages')->nullable();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('sites');
    }
};
