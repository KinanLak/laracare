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

use App\Models\Admission;
use App\Models\Hopital;
use App\Models\Chambre;
use App\Models\Medecin;
use App\Models\Patient;
use App\Models\Unite;

use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard',
        [
            'admissions' => Admission::all(),
            'chambres' => Chambre::all(),
            'hopitals' => Hopital::all(),
            'medecins' => Medecin::all(),
            'patients' => Patient::all(),
            'unites' => Unite::all(),
        ],
    );
    })->name('dashboard');


    Route::get('Hopital', function () {
        return Inertia::render('Hopital',
        [
            'hopitals' => Hopital::all(),
        ],
    );
    })->name('Hopital');

    Route::get('Admission', function () {
        return Inertia::render('Admission',
        [
            'admissions' => Admission::all(),
        ],
    );
    })->name('Admission');

    Route::get('Chambre', function () {
        return Inertia::render('Chambre',
        [
            'chambres' => Chambre::all(),
        ],
    );
    })->name('Chambre');

    Route::get('Medecin', function () {
        return Inertia::render('Medecin',
        [
            'medecins' => Medecin::all(),
        ],
    );
    })->name('Medecin');

    Route::get('Patient', function () {
        return Inertia::render('Patient',
        [
            'patients' => Patient::all(),
        ],
    );
    })->name('Patient');

    Route::get('Unite', function () {
        return Inertia::render('Unite',
        [
            'unites' => Unite::all(),
        ],
    );
    })->name('Unite');
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
