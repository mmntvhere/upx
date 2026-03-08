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
    Schema::table('sites', function (Blueprint $table) {
        $table->json('description_translations')->nullable();
        $table->json('review_translations')->nullable();
        $table->json('pros_translations')->nullable();
        $table->json('cons_translations')->nullable();
        $table->json('seo_title_translations')->nullable();
        $table->json('seo_description_translations')->nullable();
    });
}

public function down(): void
{
    Schema::table('sites', function (Blueprint $table) {
        $table->dropColumn([
            'description_translations',
            'review_translations',
            'pros_translations',
            'cons_translations',
            'seo_title_translations',
            'seo_description_translations',
        ]);
    });
}
};
