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
            $table->string('name'); // Название категории
            $table->string('slug')->nullable()->unique(); // Уникальный slug для URL
            $table->text('description')->nullable(); // Описание
            $table->string('icon')->nullable(); // Иконка категории
            $table->string('disclaimer')->nullable(); // Дисклеймер
            $table->boolean('is_active')->default(true); // Активна ли категория
            $table->timestamps(); // created_at и updated_at
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
