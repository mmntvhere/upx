<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            if (!Schema::hasColumn('categories', 'description_translations')) {
                $table->json('description_translations')->nullable()->after('description');
            }

            if (!Schema::hasColumn('categories', 'seo_description_translations')) {
                $table->json('seo_description_translations')->nullable()->after('seo_title_translations');
            }
        });
    }

    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            if (Schema::hasColumn('categories', 'description_translations')) {
                $table->dropColumn('description_translations');
            }

            if (Schema::hasColumn('categories', 'seo_description_translations')) {
                $table->dropColumn('seo_description_translations');
            }
        });
    }
};