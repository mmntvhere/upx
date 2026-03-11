<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Page;

class PageController extends Controller
{
    public function index()
    {
        $pages = Page::where('is_active', true)
                     ->orderBy('position', 'asc')
                     ->get(['id', 'slug', 'title']);

        return response()->json($pages);
    }

    public function show($slug)
    {
        $page = Page::where('slug', $slug)
                    ->where('is_active', true)
                    ->firstOrFail();

        return response()->json($page);
    }
}
