<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index()
    {
        return response()->json(Schedule::with(['bus', 'route.stops'])->get(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'bus_id'         => 'required|exists:buses,id',
            'route_id'       => 'required|exists:routes,id',
            'departure_time' => 'required|date',
            'arrival_time'   => 'required|date|after:departure_time',
            'fare'           => 'required|numeric',
        ]);

        $schedule = Schedule::create($validated);
        return response()->json(['message' => 'Schedule created successfully.', 'schedule' => $schedule], 201);
    }

    public function destroy($id)
    {
        Schedule::findOrFail($id)->delete();
        return response()->json(['message' => 'Schedule deleted successfully.'], 200);
    }
}