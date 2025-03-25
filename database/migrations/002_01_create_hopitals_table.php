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
        Schema::create('hopitals', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('nom');
            $table->string('adresse');
            $table->string('telephone');
            $table->string('ville');
            $table->string('email');
            $table->string('directeur');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hopitals');
    }
};
