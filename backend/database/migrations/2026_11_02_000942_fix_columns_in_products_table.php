<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->renameColumn('nom', 'name');
            $table->renameColumn('stock', 'stock_quantity');
            $table->string('image_url')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->renameColumn('name', 'nom');
            $table->renameColumn('stock_quantity', 'stock');
            $table->dropColumn('image_url');
        });
    }
};