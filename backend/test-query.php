<?php
require __DIR__.'/vendor/autoload.php'; 
$app = require_once __DIR__.'/bootstrap/app.php'; 
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap(); 

$locale='en';
$q = \App\Models\Site::orderByRaw("COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(position_per_lang, '$.\"{$locale}\"')) AS SIGNED), position) ASC")->limit(1)->get();
echo "Success: count = " . count($q) . "\n";
