<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->json('name'); // Translatable name
            $table->string('slug')->nullable()->unique();
            $table->json('description')->nullable(); // Translatable description
            $table->string('icon')->nullable();
            $table->json('disclaimer')->nullable(); // Translatable disclaimer
            $table->json('seo_title')->nullable(); // Translatable SEO title
            $table->json('seo_description')->nullable(); // Translatable SEO description
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
