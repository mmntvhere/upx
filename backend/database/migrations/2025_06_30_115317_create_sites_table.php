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
    $table->string('name');
    $table->string('slug')->unique();
    $table->text('description')->nullable();
    $table->decimal('rating', 3, 1);
    $table->string('preview')->nullable();
    $table->string('favicon')->nullable();
    $table->string('main_image')->nullable();
    $table->text('pros')->nullable();
    $table->text('cons')->nullable();
    $table->string('link');
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
