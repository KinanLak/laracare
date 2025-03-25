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
        Schema::create('medecins', function (Blueprint $table) {
            $table->string('hasld')->primary();
            $table->string('status');
            $table->string('contrat');
            $table->string('licence_medicale');
            $table->string('specialite');
            $table->string('hopital_id');
            $table->foreign('hopital_id')->references('id')->on('hopitals');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medecins');
    }
};
