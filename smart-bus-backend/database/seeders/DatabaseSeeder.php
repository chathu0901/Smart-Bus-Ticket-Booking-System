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

        // --- Route 138: Pettah -> Homagama ---
        $route138 = Route::create([
            'route_number' => '138',
            'start_location' => 'Pettah',
            'destination' => 'Homagama',
            'distance_km' => 24.5
        ]);

        $stops138 = [
            ['name' => 'Pettah (Fort)', 'distance' => 0.0],
            ['name' => 'D.R. Wijewardena Mawatha', 'distance' => 2.1],
            ['name' => 'Technical Junction', 'distance' => 3.5],
            ['name' => 'Town Hall', 'distance' => 5.2],
            ['name' => 'Borella / Thummulla', 'distance' => 7.0],
            ['name' => 'Nugegoda', 'distance' => 11.4],
            ['name' => 'Delkanda', 'distance' => 13.0],
            ['name' => 'Navinna', 'distance' => 14.5],
            ['name' => 'Maharagama', 'distance' => 16.2],
            ['name' => 'Pannipitiya', 'distance' => 18.8],
            ['name' => 'Kottawa', 'distance' => 21.0],
            ['name' => 'Homagama', 'distance' => 24.5],
        ];

        foreach ($stops138 as $index => $stop) {
            Stop::create([
                'route_id' => $route138->id,
                'stop_name' => $stop['name'],
                'stop_order' => $index + 1,
                'distance_from_origin_km' => $stop['distance']
            ]);
        }

        // --- Route 122: Pettah -> Avissawella ---
        $route122 = Route::create([
            'route_number' => '122',
            'start_location' => 'Pettah',
            'destination' => 'Avissawella',
            'distance_km' => 58.0
        ]);

        $stops122 = [
            ['name' => 'Pettah', 'distance' => 0.0],
            ['name' => 'Borella', 'distance' => 6.5],
            ['name' => 'Kirillapone', 'distance' => 9.2],
            ['name' => 'Nugegoda', 'distance' => 11.5],
            ['name' => 'Maharagama', 'distance' => 16.2],
            ['name' => 'Kottawa', 'distance' => 21.0],
            ['name' => 'Godagama', 'distance' => 26.5],
            ['name' => 'Meepe', 'distance' => 33.0],
            ['name' => 'Kosgama', 'distance' => 45.0],
            ['name' => 'Avissawella', 'distance' => 58.0],
        ];

        foreach ($stops122 as $index => $stop) {
            Stop::create([
                'route_id' => $route122->id,
                'stop_name' => $stop['name'],
                'stop_order' => $index + 1,
                'distance_from_origin_km' => $stop['distance']
            ]);
        }

        // --- Route 100: Pettah -> Panadura ---
        $route100 = Route::create([
            'route_number' => '100',
            'start_location' => 'Pettah',
            'destination' => 'Panadura',
            'distance_km' => 27.0
        ]);

        $stops100 = [
            ['name' => 'Pettah', 'distance' => 0.0],
            ['name' => 'Galle Face', 'distance' => 2.5],
            ['name' => 'Kollupitiya', 'distance' => 4.2],
            ['name' => 'Bambalapitiya', 'distance' => 6.0],
            ['name' => 'Wellawatte', 'distance' => 8.1],
            ['name' => 'Dehiwala', 'distance' => 11.0],
            ['name' => 'Mount Lavinia', 'distance' => 13.5],
            ['name' => 'Ratmalana', 'distance' => 16.0],
            ['name' => 'Moratuwa', 'distance' => 20.5],
            ['name' => 'Panadura', 'distance' => 27.0],
        ];

        foreach ($stops100 as $index => $stop) {
            Stop::create([
                'route_id' => $route100->id,
                'stop_name' => $stop['name'],
                'stop_order' => $index + 1,
                'distance_from_origin_km' => $stop['distance']
            ]);
        }

        // --- Route 120: Pettah -> Horana ---
        $route120 = Route::create([
            'route_number' => '120',
            'start_location' => 'Pettah',
            'destination' => 'Horana',
            'distance_km' => 42.0
        ]);

        $stops120 = [
            ['name' => 'Pettah', 'distance' => 0.0],
            ['name' => 'Lake House', 'distance' => 1.8],
            ['name' => 'Bambalapitiya', 'distance' => 6.2],
            ['name' => 'Kohuwala', 'distance' => 10.5],
            ['name' => 'Pepiliyana', 'distance' => 12.0],
            ['name' => 'Boralesgamuwa', 'distance' => 14.8],
            ['name' => 'Piliyandala', 'distance' => 18.5],
            ['name' => 'Kahathuduwa', 'distance' => 26.0],
            ['name' => 'Pokunuwita', 'distance' => 34.0],
            ['name' => 'Horana', 'distance' => 42.0],
        ];

        foreach ($stops120 as $index => $stop) {
            Stop::create([
                'route_id' => $route120->id,
                'stop_name' => $stop['name'],
                'stop_order' => $index + 1,
                'distance_from_origin_km' => $stop['distance']
            ]);
        }

        // --- Route 01: Colombo (Pettah) -> Kandy ---
        $route01 = Route::create([
            'route_number' => '01',
            'start_location' => 'Pettah',
            'destination' => 'Kandy',
            'distance_km' => 115.0
        ]);

        $stops01 = [
            ['name' => 'Pettah', 'distance' => 0.0],
            ['name' => 'Kelaniya', 'distance' => 9.5],
            ['name' => 'Kiribathgoda', 'distance' => 13.0],
            ['name' => 'Kadawatha', 'distance' => 17.5],
            ['name' => 'Nittambuwa', 'distance' => 38.0],
            ['name' => 'Warakapola', 'distance' => 56.0],
            ['name' => 'Ambepussa', 'distance' => 60.0],
            ['name' => 'Kegalle', 'distance' => 78.0],
            ['name' => 'Mawanella', 'distance' => 92.0],
            ['name' => 'Peradeniya', 'distance' => 109.0],
            ['name' => 'Kandy', 'distance' => 115.0],
        ];

        foreach ($stops01 as $index => $stop) {
            Stop::create([
                'route_id' => $route01->id,
                'stop_name' => $stop['name'],
                'stop_order' => $index + 1,
                'distance_from_origin_km' => $stop['distance']
            ]);
        }

        // --- Route 02: Colombo (Pettah) -> Galle ---
        $route02 = Route::create([
            'route_number' => '02',
            'start_location' => 'Pettah',
            'destination' => 'Galle',
            'distance_km' => 119.0
        ]);

        $stops02 = [
            ['name' => 'Pettah', 'distance' => 0.0],
            ['name' => 'Kalutara', 'distance' => 43.0],
            ['name' => 'Beruwala', 'distance' => 56.0],
            ['name' => 'Aluthgama', 'distance' => 62.0],
            ['name' => 'Ambalangoda', 'distance' => 86.0],
            ['name' => 'Hikkaduwa', 'distance' => 98.0],
            ['name' => 'Galle', 'distance' => 119.0],
        ];

        foreach ($stops02 as $index => $stop) {
            Stop::create([
                'route_id' => $route02->id,
                'stop_name' => $stop['name'],
                'stop_order' => $index + 1,
                'distance_from_origin_km' => $stop['distance']
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