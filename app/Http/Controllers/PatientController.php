<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\Personne;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $patients = Patient::with('personne')->get();
        return Inertia::render('Patient/Index', [
            'patients' => $patients
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $personnes = Personne::whereDoesntHave('patient')->get();
        return Inertia::render('Patient/Create', [
            'personnes' => $personnes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'patientid' => 'required|string|max:255|unique:patients',
            'dni' => 'required|string|max:255|exists:personnes,dni',
        ]);

        Patient::create($validated);

        return redirect()->route('patients.index')
            ->with('success', 'Patient créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        return Inertia::render('Patient/Show', [
            'patient' => $patient->load(['personne', 'admissions'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Patient $patient)
    {
        $personnes = Personne::all();
        return Inertia::render('Patient/Edit', [
            'patient' => $patient,
            'personnes' => $personnes
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'dni' => 'required|string|max:255|exists:personnes,dni',
        ]);

        $patient->update($validated);

        return redirect()->route('patients.index')
            ->with('success', 'Patient mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        $patient->delete();

        return redirect()->route('patients.index')
            ->with('success', 'Patient supprimé avec succès.');
    }

    /**
     * Get patient details with admissions for API.
     */
    public function getPatientDetails($patientId)
    {
        $patient = Patient::with(['personne', 'admissions'])->findOrFail($patientId);
        return response()->json([
            'patient' => $patient,
            'admissions' => $patient->admissions
        ]);
    }
}
