<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class UpdateCategoryRequest extends FormRequest
{
    /**
     * Разрешить ли пользователю выполнять этот запрос.
     */
    public function authorize(): bool
    {
        return true; // В будущем здесь можно проверять права доступа
    }

    /**
     * Правила валидации.
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:categories,slug,' . $this->route('category')->id,
            'description' => 'nullable|string',
            'icon' => 'nullable|file|mimes:jpeg,png,jpg,svg,webp,avif|max:2048',
            'disclaimer' => 'nullable|string',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'is_active' => 'sometimes|boolean',
            'translations' => 'nullable|array',
        ];
    }

    /**
     * Подготовка данных перед валидацией.
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'is_active' => $this->boolean('is_active'),
            'slug' => $this->filled('slug') ? Str::slug($this->slug) : Str::slug($this->name),
        ]);
    }
}
