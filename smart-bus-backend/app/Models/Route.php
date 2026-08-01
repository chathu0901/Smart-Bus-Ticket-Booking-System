<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    protected $fillable = ['route_number', 'start_location', 'destination', 'distance_km'];

    public function stops()
    {
        return $this->hasMany(Stop::class)->orderBy('stop_order', 'asc');
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }
}