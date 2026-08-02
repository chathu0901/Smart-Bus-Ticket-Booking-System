<?php

namespace App\Http\Controllers;

use App\Models\Route as BusRoute;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function index()
    {
        // Order stops by stop_order sequentially
        $routes = BusRoute::with(['stops' => function($query) {
            $query->orderBy('stop_order', 'asc');
        }])->get();

        return response()->json($routes, 200);
    }

    public function show($id)
    {
        $route = BusRoute::with(['stops' => function($query) {
            $query->orderBy('stop_order', 'asc');
        }, 'schedules.bus'])->findOrFail($id);

        return response()->json($route, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'route_number'   => 'required|string',
            'start_location' => 'required|string',
            'destination'    => 'required|string',
            'distance_km'    => 'required|numeric',
        ]);

        $route = BusRoute::create($validated);
        return response()->json(['message' => 'Route created successfully.', 'route' => $route], 201);
    }

    public function destroy($id)
    {
        BusRoute::findOrFail($id)->delete();
        return response()->json(['message' => 'Route deleted successfully.'], 200);
    }
}