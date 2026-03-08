<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ExcludedLanguage extends Model
{
    use HasFactory;

    protected $fillable = ['site_id', 'language_code'];

    /**
     * Связь: язык исключен у сайта.
     */
    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}