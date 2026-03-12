<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BannerResource;
use App\Models\Banner;
use Illuminate\Support\Facades\Cache;

class BannerController extends Controller
{
    public function index()
    {
        $banners = Cache::remember('banners.active', now()->addMinutes(10), function () {
            return Banner::where('is_active', true)->get();
        });

        return BannerResource::collection($banners);
    }
}
