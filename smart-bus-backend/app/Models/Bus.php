<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    protected $fillable = ['bus_number', 'bus_type', 'total_seats'];

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }
}