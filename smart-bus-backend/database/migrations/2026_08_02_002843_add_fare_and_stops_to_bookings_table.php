<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->decimal('fare', 8, 2)->nullable()->after('payment_receipt_path');
            $table->string('pickup_stop')->nullable()->after('fare');
            $table->string('drop_stop')->nullable()->after('pickup_stop');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn(['fare', 'pickup_stop', 'drop_stop']);
        });
    }
};