<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('stops', function (Blueprint $table) {
            $table->id();
            $table->foreignId('route_id')->constrained()->onDelete('cascade');
            $table->string('stop_name');
            $table->integer('stop_order');
            $table->decimal('distance_from_origin_km', 8, 2); // Added for fare calculation
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('stops');
    }
};