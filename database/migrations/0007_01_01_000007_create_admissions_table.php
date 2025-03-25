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
        Schema::create('admissions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->date('date');
            $table->time('heure');
            $table->string('type');
            $table->text('justification')->nullable();
            $table->string('status');
            $table->string('insurance')->nullable();
            $table->text('commentaires')->nullable();
            $table->string('patientid');
            $table->foreign('patientid')->references('patientid')->on('patients');
            $table->timestamps();
            $table->softDeletes();
        });

        // Create the pivot tables for many-to-many relationships
        Schema::create('admission_chambre', function (Blueprint $table) {
            $table->string('admission_id');
            $table->string('chambre_nombre');
            $table->primary(['admission_id', 'chambre_nombre']);
            $table->foreign('admission_id')->references('id')->on('admissions')
                ->onDelete('cascade');
            $table->foreign('chambre_nombre')->references('nombre')->on('chambres')
                ->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('admission_unite', function (Blueprint $table) {
            $table->string('admission_id');
            $table->string('unite_code');
            $table->primary(['admission_id', 'unite_code']);
            $table->foreign('admission_id')->references('id')->on('admissions')
                ->onDelete('cascade');
            $table->foreign('unite_code')->references('code')->on('unites')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_unite');
        Schema::dropIfExists('admission_chambre');
        Schema::dropIfExists('admissions');
    }
};
