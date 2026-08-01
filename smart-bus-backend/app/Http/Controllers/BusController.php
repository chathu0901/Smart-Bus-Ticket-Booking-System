<?php

namespace App\Http\Controllers;

use App\Models\Bus;
use Illuminate\Http\Request;

class BusController extends Controller
{
    public function index()
    {
        return response()->json(Bus::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'bus_number' => 'required|string|unique:buses',
            'bus_type'   => 'required|string',
            'total_seats'=> 'required|integer|min:10',
        ]);

        $bus = Bus::create($validated);
        return response()->json(['message' => 'Bus created successfully.', 'bus' => $bus], 201);
    }

    public function destroy($id)
    {
        Bus::findOrFail($id)->delete();
        return response()->json(['message' => 'Bus deleted successfully.'], 200);
    }
}