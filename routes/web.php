<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HopitalController;
use App\Http\Controllers\MedecinController;
use App\Http\Controllers\PersonneController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\UniteController;
use App\Http\Controllers\ChambreController;
use App\Http\Controllers\AdmissionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware('auth')->group(function () {
    // Hopital routes
    Route::resource('hopitals', HopitalController::class);

    // Medecin routes
    Route::resource('medecins', MedecinController::class);

    // Personne routes
    Route::resource('personnes', PersonneController::class);

    // Patient routes
    Route::resource('patients', PatientController::class);

    // Unite routes
    Route::resource('unites', UniteController::class);

    // Chambre routes
    Route::resource('chambres', ChambreController::class);

    // Admission routes
    Route::resource('admissions', AdmissionController::class);

    // API routes for Unite-related data
    Route::get('/api/chambres/by-unite/{code}', [ChambreController::class, 'getByUniteCode'])->name('api.chambres.by-unite');
    Route::get('/api/admissions/by-unite/{code}', [AdmissionController::class, 'getByUniteCode'])->name('api.admissions.by-unite');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
