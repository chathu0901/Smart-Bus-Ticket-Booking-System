<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stop extends Model
{
    protected $fillable = ['route_id', 'stop_name', 'stop_order', 'distance_from_origin_km'];

    public function route()
    {
        return $this->belongsTo(Route::class);
    }
}