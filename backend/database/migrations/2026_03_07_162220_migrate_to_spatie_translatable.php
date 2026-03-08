<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // --- SITES ---
        $siteFields = ['seo_title', 'seo_description', 'description', 'review', 'pros', 'cons'];

        // 1. Переименовываем старые колонки
        Schema::table('sites', function (Blueprint $table) use ($siteFields) {
            foreach ($siteFields as $field) {
                $table->renameColumn($field, "{$field}_old");
            }
        });

        // 2. Создаем новые JSON колонки
        Schema::table('sites', function (Blueprint $table) use ($siteFields) {
            foreach ($siteFields as $field) {
                $table->json($field)->nullable();
            }
        });

        // 3. Переносим данные
        $sites = DB::table('sites')->get();
        foreach ($sites as $site) {
            $updates = [];
            foreach ($siteFields as $field) {
                $oldField = "{$field}_old";
                $transField = "{$field}_translations";
                
                $translations = [];
                if (isset($site->$transField)) {
                    $translations = json_decode($site->$transField, true) ?: [];
                }

                if (!isset($translations['en']) && !empty($site->$oldField)) {
                    $translations['en'] = $site->$oldField;
                }

                $updates[$field] = json_encode($translations);
            }
            
            if (!empty($updates)) {
                DB::table('sites')->where('id', $site->id)->update($updates);
            }
        }

        // 4. Удаляем старые колонки
        Schema::table('sites', function (Blueprint $table) use ($siteFields) {
            foreach ($siteFields as $field) {
                $table->dropColumn("{$field}_old");
                $table->dropColumn("{$field}_translations");
            }
        });

        // --- CATEGORIES ---
        $catFields = ['name', 'description', 'seo_title', 'seo_description', 'disclaimer'];

        Schema::table('categories', function (Blueprint $table) use ($catFields) {
            foreach ($catFields as $field) {
                $table->renameColumn($field, "{$field}_old");
            }
        });

        Schema::table('categories', function (Blueprint $table) use ($catFields) {
            foreach ($catFields as $field) {
                $table->json($field)->nullable();
            }
        });

        $categories = DB::table('categories')->get();
        foreach ($categories as $cat) {
            $updates = [];
            foreach ($catFields as $field) {
                $oldField = "{$field}_old";
                $transField = "{$field}_translations";
                
                $translations = [];
                if (isset($cat->$transField)) {
                    $translations = json_decode($cat->$transField, true) ?: [];
                }

                if (!isset($translations['en']) && !empty($cat->$oldField)) {
                    $translations['en'] = $cat->$oldField;
                }

                $updates[$field] = json_encode($translations);
            }
            
            if (!empty($updates)) {
                DB::table('categories')->where('id', $cat->id)->update($updates);
            }
        }

        Schema::table('categories', function (Blueprint $table) use ($catFields) {
            foreach ($catFields as $field) {
                $table->dropColumn("{$field}_old");
                $table->dropColumn("{$field}_translations");
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // One-way migration for cleanup
    }
};
