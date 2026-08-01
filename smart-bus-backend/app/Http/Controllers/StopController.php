<?php

namespace App\Http\Controllers;

use App\Models\Stop;
use Illuminate\Http\Request;

class StopController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'route_id'   => 'required|exists:routes,id',
            'stop_name'  => 'required|string',
            'stop_order' => 'required|integer',
        ]);

        $stop = Stop::create($validated);
        return response()->json(['message' => 'Stop added successfully.', 'stop' => $stop], 201);
    }

    public function destroy($id)
    {
        Stop::findOrFail($id)->delete();
        return response()->json(['message' => 'Stop removed successfully.'], 200);
    }
}