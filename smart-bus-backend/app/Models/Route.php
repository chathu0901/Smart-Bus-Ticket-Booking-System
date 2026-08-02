<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Route extends Model
{
    protected $fillable = ['route_number', 'start_location', 'destination', 'distance_km'];

    /**
     * Get intermediate stops associated with the route ordered by stop_order.
     */
    public function stops(): HasMany
    {
        return $this->hasMany(Stop::class)->orderBy('stop_order', 'asc');
    }

    /**
     * Get schedules associated with the route along with bus details.
     */
    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class)->with(['bus']);
    }
}