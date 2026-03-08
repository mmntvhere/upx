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
        // 1. Unify Categories table
        Schema::table('categories', function (Blueprint $table) {
            // First, ensure all translatable columns are json
            $table->json('name')->change();
            $table->json('description')->nullable()->change();
            $table->json('seo_title')->nullable()->change();
            $table->json('seo_description')->nullable()->change();
            $table->json('disclaimer')->nullable()->change();
        });

        // 2. Unify Sites table
        Schema::table('sites', function (Blueprint $table) {
            $table->json('description')->nullable()->change();
            $table->json('review')->nullable()->change();
            $table->json('pros')->nullable()->change();
            $table->json('cons')->nullable()->change();
            $table->json('seo_title')->nullable()->change();
            $table->json('seo_description')->nullable()->change();
        });

        // 3. Drop redundant translation columns (assuming their data will be lost or moved)
        Schema::table('categories', function (Blueprint $table) {
            $cols = ['description_translations', 'seo_description_translations'];
            foreach ($cols as $col) {
                if (Schema::hasColumn('categories', $col)) {
                    $table->dropColumn($col);
                }
            }
        });

        Schema::table('sites', function (Blueprint $table) {
            $cols = [
                'description_translations',
                'review_translations',
                'pros_translations',
                'cons_translations',
                'seo_title_translations',
                'seo_description_translations'
            ];
            foreach ($cols as $col) {
                if (Schema::hasColumn('sites', $col)) {
                    $table->dropColumn($col);
                }
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reverting this is complex, so we will skip detailed down() for this specific cleanup
    }
};
