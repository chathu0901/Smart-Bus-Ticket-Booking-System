<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BusController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\StopController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\BookingController;

Route::get('/', function () {
    return response()->json(['message' => 'Smart Bus Booking API']);
});

// API Routes
Route::prefix('api')->group(function () {
    // Public authentication routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Protected authentication routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);

        // Domain Endpoints
        Route::apiResource('buses', BusController::class)->only(['index', 'store', 'destroy']);
        Route::apiResource('bus-routes', RouteController::class)->only(['index', 'store', 'destroy']);
        Route::post('/stops', [StopController::class, 'store']);
        Route::delete('/stops/{id}', [StopController::class, 'destroy']);
        Route::apiResource('schedules', ScheduleController::class)->only(['index', 'store', 'destroy']);
        
        // Bookings
        Route::get('/bookings', [BookingController::class, 'index']);
        Route::get('/my-bookings', [BookingController::class, 'userBookings']);
        Route::post('/bookings', [BookingController::class, 'store']);
        Route::patch('/bookings/{id}/status', [BookingController::class, 'updateStatus']);
    });
});