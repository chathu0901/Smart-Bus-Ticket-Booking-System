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
            $table->integer('stop_order'); // Order of stop in sequence (1, 2, 3...)
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('stops');
    }
};