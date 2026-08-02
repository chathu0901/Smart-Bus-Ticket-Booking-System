<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ScheduleController extends Controller
{
    /**
     * Display a listing of all active schedules with their bus, route, and stops.
     */
    public function index(): JsonResponse
    {
        // Eager load bus, route, and route stops sorted by departure time
        $schedules = Schedule::with(['bus', 'route.stops'])
            ->orderBy('departure_time', 'asc')
            ->get();

        return response()->json($schedules, 200);
    }

    /**
     * Store a newly created schedule in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'bus_id'         => 'required|exists:buses,id',
            'route_id'       => 'required|exists:routes,id',
            'departure_time' => 'required|date',
            'arrival_time'   => 'required|date|after:departure_time',
            'fare'           => 'required|numeric|min:0',
        ]);

        $schedule = Schedule::create($validated);

        // Load nested relationships (bus, route, and stops) for the response payload
        $schedule->load(['bus', 'route.stops']);

        return response()->json([
            'message'  => 'Schedule created successfully.',
            'schedule' => $schedule
        ], 201);
    }

    /**
     * Remove the specified schedule from storage.
     */
    public function destroy($id): JsonResponse
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->delete();

        return response()->json([
            'message' => 'Schedule deleted successfully.'
        ], 200);
    }
}