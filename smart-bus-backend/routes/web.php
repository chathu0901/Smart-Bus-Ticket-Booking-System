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

    // ==========================================
    // 1. PUBLIC ROUTES (No Token Required)
    // ==========================================
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Allow passengers to view schedules & routes without 401 blocking
    Route::get('/schedules', [ScheduleController::class, 'index']);
    Route::get('/bus-routes', [RouteController::class, 'index']);
    Route::get('/bus-routes/{id}', [RouteController::class, 'show']);


    // ==========================================
    // 2. PROTECTED ROUTES (Sanctum Auth Required)
    // ==========================================
    Route::middleware('auth:sanctum')->group(function () {
        
        // Auth
        Route::post('/logout', [AuthController::class, 'logout']);

        // Buses
        Route::apiResource('buses', BusController::class)->only(['index', 'store', 'destroy']);

        // Bus Routes (Creation & Deletion)
        Route::post('/bus-routes', [RouteController::class, 'store']);
        Route::delete('/bus-routes/{id}', [RouteController::class, 'destroy']);

        // Stops
        Route::post('/stops', [StopController::class, 'store']);
        Route::delete('/stops/{id}', [StopController::class, 'destroy']);

        // Schedules (Creation & Deletion)
        Route::post('/schedules', [ScheduleController::class, 'store']);
        Route::delete('/schedules/{id}', [ScheduleController::class, 'destroy']);

        // Bookings Management
        Route::get('/bookings', [BookingController::class, 'index']);
        Route::get('/my-bookings', [BookingController::class, 'userBookings']);
        Route::post('/bookings', [BookingController::class, 'store']);
        Route::patch('/bookings/{id}/status', [BookingController::class, 'updateStatus']);
    });
});