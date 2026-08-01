<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        // Admin view: fetch all bookings
        return response()->json(Booking::with(['user', 'schedule.bus', 'schedule.route'])->get(), 200);
    }

    public function userBookings(Request $request)
    {
        // Passenger view: fetch user's own bookings
        return response()->json($request->user()->bookings()->with(['schedule.bus', 'schedule.route'])->get(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'schedule_id' => 'required|exists:schedules,id',
            'seat_number' => 'required|integer',
            'payment_receipt' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048'
        ]);

        $path = null;
        if ($request->hasFile('payment_receipt')) {
            $path = $request->file('payment_receipt')->store('receipts', 'public');
        }

        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'schedule_id' => $validated['schedule_id'],
            'seat_number' => $validated['seat_number'],
            'payment_receipt_path' => $path,
            'status' => 'pending'
        ]);

        return response()->json(['message' => 'Booking request submitted!', 'booking' => $booking], 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected'
        ]);

        $booking = Booking::findOrFail($id);
        $booking->update(['status' => $validated['status']]);

        return response()->json(['message' => "Booking {$validated['status']} successfully.", 'booking' => $booking], 200);
    }
}