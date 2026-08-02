<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Admin view: fetch all bookings with user and schedule details
     */
    public function index()
    {
        $bookings = Booking::with(['user', 'schedule.bus', 'schedule.route.stops'])->get();
        return response()->json($bookings, 200);
    }

    /**
     * Passenger view: fetch logged-in user's bookings
     */
    public function userBookings(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $bookings = Booking::where('user_id', $user->id)
            ->with(['schedule.bus', 'schedule.route.stops'])
            ->latest()
            ->get();

        return response()->json($bookings, 200);
    }

    /**
     * Create a new booking request with mandatory payment proof
     */
    public function store(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $validated = $request->validate([
            'schedule_id'     => 'required|exists:schedules,id',
            'seat_number'     => 'required|integer',
            'payment_receipt' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'fare'            => 'nullable|numeric',
            'pickup_stop'     => 'nullable|string',
            'drop_stop'       => 'nullable|string',
        ]);

        $receiptPath = null;
        if ($request->hasFile('payment_receipt')) {
            $receiptPath = $request->file('payment_receipt')->store('receipts', 'public');
        }

        $booking = Booking::create([
            'user_id'              => $user->id,
            'schedule_id'          => $validated['schedule_id'],
            'seat_number'          => $validated['seat_number'],
            'payment_receipt_path' => $receiptPath,
            'fare'                 => $request->input('fare', null),
            'pickup_stop'          => $request->input('pickup_stop', null),
            'drop_stop'            => $request->input('drop_stop', null),
            'status'               => 'pending'
        ]);

        return response()->json([
            'message' => 'Booking request submitted successfully!',
            'booking' => $booking->load(['schedule.bus', 'schedule.route.stops'])
        ], 201);
    }

    /**
     * Admin: Approve or Reject a booking
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected'
        ]);

        $booking = Booking::findOrFail($id);
        $booking->update(['status' => $validated['status']]);

        return response()->json([
            'message' => "Booking {$validated['status']} successfully.",
            'booking' => $booking
        ], 200);
    }

    /**
     * Passenger / Admin: Cancel or Delete a booking
     */
    public function cancel(Request $request, $id)
    {
        $user = $request->user();
        $booking = Booking::findOrFail($id);

        // Security Check: Only allow owner or admin to cancel
        if ($booking->user_id !== $user->id && $user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized action.'], 403);
        }

        $booking->delete();

        return response()->json(['message' => 'Booking cancelled successfully.'], 200);
    }
}