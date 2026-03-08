<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::where('is_active', true)
            ->with(['sites' => function ($query) {
                $query->where('is_active', true)->orderBy('position');
            }])
            ->get();

        return \App\Http\Resources\CategoryResource::collection($categories);
    }
}