<?php

namespace App\Http\Controllers;

use App\Models\Admission;
use App\Models\Patient;
use App\Models\Unite;
use App\Models\Chambre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admissions = Admission::with('patient.personne')->get();
        return Inertia::render('Admission/Index', [
            'admissions' => $admissions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $patients = Patient::with('personne')->get();
        $unites = Unite::all();
        $chambres = Chambre::all();

        return Inertia::render('Admission/Create', [
            'patients' => $patients,
            'unites' => $unites,
            'chambres' => $chambres
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|string|max:255|unique:admissions',
            'date' => 'required|date',
            'heure' => 'required',
            'type' => 'required|string|max:255',
            'justification' => 'nullable|string',
            'status' => 'required|string|max:255',
            'insurance' => 'nullable|string|max:255',
            'commentaires' => 'nullable|string',
            'patientid' => 'required|string|exists:patients,patientid',
            'unites' => 'nullable|array',
            'chambres' => 'nullable|array',
        ]);

        $admission = Admission::create([
            'id' => $validated['id'],
            'date' => $validated['date'],
            'heure' => $validated['heure'],
            'type' => $validated['type'],
            'justification' => $validated['justification'],
            'status' => $validated['status'],
            'insurance' => $validated['insurance'],
            'commentaires' => $validated['commentaires'],
            'patientid' => $validated['patientid'],
        ]);

        if (isset($validated['unites'])) {
            $admission->unites()->attach($validated['unites']);
        }

        if (isset($validated['chambres'])) {
            $admission->chambres()->attach($validated['chambres']);
        }

        return redirect()->route('admissions.index')
            ->with('success', 'Admission créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Admission $admission)
    {
        return Inertia::render('Admission/Show', [
            'admission' => $admission->load(['patient.personne', 'unites', 'chambres'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admission $admission)
    {
        $patients = Patient::with('personne')->get();
        $unites = Unite::all();
        $chambres = Chambre::all();

        return Inertia::render('Admission/Edit', [
            'admission' => $admission->load(['unites', 'chambres']),
            'patients' => $patients,
            'unites' => $unites,
            'chambres' => $chambres
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Admission $admission)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'heure' => 'required',
            'type' => 'required|string|max:255',
            'justification' => 'nullable|string',
            'status' => 'required|string|max:255',
            'insurance' => 'nullable|string|max:255',
            'commentaires' => 'nullable|string',
            'patientid' => 'required|string|exists:patients,patientid',
            'unites' => 'nullable|array',
            'chambres' => 'nullable|array',
        ]);

        $admission->update([
            'date' => $validated['date'],
            'heure' => $validated['heure'],
            'type' => $validated['type'],
            'justification' => $validated['justification'],
            'status' => $validated['status'],
            'insurance' => $validated['insurance'],
            'commentaires' => $validated['commentaires'],
            'patientid' => $validated['patientid'],
        ]);

        if (isset($validated['unites'])) {
            $admission->unites()->sync($validated['unites']);
        }

        if (isset($validated['chambres'])) {
            $admission->chambres()->sync($validated['chambres']);
        }

        return redirect()->route('admissions.index')
            ->with('success', 'Admission mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admission $admission)
    {
        $admission->delete();

        return redirect()->route('admissions.index')
            ->with('success', 'Admission supprimée avec succès.');
    }

    /**
     * Get all admissions by unite code for API.
     */
    public function getByUniteCode($code)
    {
        $unite = Unite::findOrFail($code);
        $admissions = $unite->admissions()->with('patient.personne')->get();

        return response()->json($admissions);
    }
}
