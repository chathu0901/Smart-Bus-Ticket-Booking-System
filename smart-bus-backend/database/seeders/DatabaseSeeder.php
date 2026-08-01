<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Bus;
use App\Models\Route;
use App\Models\Stop;
use App\Models\Schedule;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ==========================================
        // 1. SYSTEM USERS
        // ==========================================

        // Default Admin Account
        User::create([
            'name' => 'System Admin',
            'email' => 'admin@smartbus.com',
            'password' => Hash::make('Admin123!'),
            'role' => 'admin'
        ]);

        // Default Passenger Account (For quick testing)
        User::create([
            'name' => 'Nimal Perera',
            'email' => 'nimal@gmail.com',
            'password' => Hash::make('Passenger123!'),
            'role' => 'passenger'
        ]);

        // ==========================================
        // 2. BUS ROUTES & INTERMEDIATE STOPS
        // ==========================================

        // --- Route 138: Pettah -> Homagama / Maharagama ---
        $route138 = Route::create([
            'route_number' => '138',
            'origin' => 'Pettah',
            'destination' => 'Homagama',
            'distance_km' => 24.5
        ]);

        $stops138 = [
            'Pettah (Fort)', 'D.R. Wijewardena Mawatha', 'Technical Junction',
            'Town Hall', 'Borella / Thummulla', 'Nugegoda', 'Delkanda',
            'Navinna', 'Maharagama', 'Pannipitiya', 'Kottawa', 'Homagama'
        ];
        foreach ($stops138 as $index => $stopName) {
            Stop::create([
                'route_id' => $route138->id,
                'stop_name' => $stopName,
                'stop_order' => $index + 1
            ]);
        }

        // --- Route 122: Pettah -> Avissawella ---
        $route122 = Route::create([
            'route_number' => '122',
            'origin' => 'Pettah',
            'destination' => 'Avissawella',
            'distance_km' => 58.0
        ]);

        $stops122 = [
            'Pettah', 'Borella', 'Kirillapone', 'Nugegoda', 'Maharagama',
            'Kottawa', 'Godagama', 'Meepe', 'Kosgama', 'Avissawella'
        ];
        foreach ($stops122 as $index => $stopName) {
            Stop::create([
                'route_id' => $route122->id,
                'stop_name' => $stopName,
                'stop_order' => $index + 1
            ]);
        }

        // --- Route 100: Pettah -> Panadura ---
        $route100 = Route::create([
            'route_number' => '100',
            'origin' => 'Pettah',
            'destination' => 'Panadura',
            'distance_km' => 27.0
        ]);

        $stops100 = [
            'Pettah', 'Galle Face', 'Kollupitiya', 'Bambalapitiya',
            'Wellawatte', 'Dehiwala', 'Mount Lavinia', 'Ratmalana',
            'Moratuwa', 'Panadura'
        ];
        foreach ($stops100 as $index => $stopName) {
            Stop::create([
                'route_id' => $route100->id,
                'stop_name' => $stopName,
                'stop_order' => $index + 1
            ]);
        }

        // --- Route 120: Pettah -> Horana ---
        $route120 = Route::create([
            'route_number' => '120',
            'origin' => 'Pettah',
            'destination' => 'Horana',
            'distance_km' => 42.0
        ]);

        $stops120 = [
            'Pettah', 'Lake House', 'Bambalapitiya', 'Kohuwala',
            'Pepiliyana', 'Boralesgamuwa', 'Piliyandala',
            'Kahathuduwa', 'Pokunuwita', 'Horana'
        ];
        foreach ($stops120 as $index => $stopName) {
            Stop::create([
                'route_id' => $route120->id,
                'stop_name' => $stopName,
                'stop_order' => $index + 1
            ]);
        }

        // --- Route 01: Colombo (Pettah) -> Kandy ---
        $route01 = Route::create([
            'route_number' => '01',
            'origin' => 'Pettah',
            'destination' => 'Kandy',
            'distance_km' => 115.0
        ]);

        $stops01 = [
            'Pettah', 'Kelaniya', 'Kiribathgoda', 'Kadawatha', 'Nittambuwa',
            'Warakapola', 'Ambepussa', 'Kegalle', 'Mawanella', 'Peradeniya', 'Kandy'
        ];
        foreach ($stops01 as $index => $stopName) {
            Stop::create([
                'route_id' => $route01->id,
                'stop_name' => $stopName,
                'stop_order' => $index + 1
            ]);
        }

        // --- Route 02: Colombo (Pettah) -> Galle ---
        $route02 = Route::create([
            'route_number' => '02',
            'origin' => 'Pettah',
            'destination' => 'Galle',
            'distance_km' => 119.0
        ]);

        $stops02 = [
            'Pettah', 'Kalutara', 'Beruwala', 'Aluthgama',
            'Ambalangoda', 'Hikkaduwa', 'Galle'
        ];
        foreach ($stops02 as $index => $stopName) {
            Stop::create([
                'route_id' => $route02->id,
                'stop_name' => $stopName,
                'stop_order' => $index + 1
            ]);
        }

        // ==========================================
        // 3. SAMPLE BUSES
        // ==========================================
        $bus1 = Bus::create([
            'bus_number' => 'NC-4588',
            'bus_type' => 'Luxury AC',
            'total_seats' => 40
        ]);

        $bus2 = Bus::create([
            'bus_number' => 'ND-1204',
            'bus_type' => 'Semi-Luxury',
            'total_seats' => 52
        ]);

        // ==========================================
        // 4. SAMPLE SCHEDULES
        // ==========================================
        Schedule::create([
            'bus_id' => $bus1->id,
            'route_id' => $route01->id,
            'departure_time' => '2026-08-05 06:30:00',
            'arrival_time' => '2026-08-05 09:30:00',
            'fare' => 950.00
        ]);

        Schedule::create([
            'bus_id' => $bus2->id,
            'route_id' => $route02->id,
            'departure_time' => '2026-08-05 08:00:00',
            'arrival_time' => '2026-08-05 11:15:00',
            'fare' => 800.00
        ]);
    }
}