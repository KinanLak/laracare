<?php

namespace App\Http\Controllers;

use App\Models\Medecin;
use App\Models\Hopital;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MedecinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // On s'assure que les relations sont bien chargées
        $medecins = Medecin::with(['personne', 'hopital'])->get();
        return Inertia::render('Medecin', [
            'medecins' => $medecins
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hopitals = Hopital::all();
        return Inertia::render('Medecin/Create', [
            'hopitals' => $hopitals
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'hasld' => 'required|string|max:255|unique:medecins',
            'status' => 'required|string|max:255',
            'contrat' => 'required|string|max:255',
            'licence_medicale' => 'required|string|max:255',
            'specialite' => 'required|string|max:255',
            'hopital_id' => 'required|string|exists:hopitals,id',
            'dni' => 'required|string|exists:personnes,dni|unique:medecins',
        ]);

        Medecin::create($validated);

        return redirect()->route('medecins.index')
            ->with('success', 'Médecin créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Medecin $medecin)
    {
        return Inertia::render('Medecin/Show', [
            'medecin' => $medecin->load(['hopital', 'personne', 'admissions'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Medecin $medecin)
    {
        $hopitals = Hopital::all();
        return Inertia::render('Medecin/Edit', [
            'medecin' => $medecin,
            'hopitals' => $hopitals
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Medecin $medecin)
    {
        $validated = $request->validate([
            'status' => 'required|string|max:255',
            'contrat' => 'required|string|max:255',
            'licence_medicale' => 'required|string|max:255',
            'specialite' => 'required|string|max:255',
            'hopital_id' => 'required|string|exists:hopitals,id',
        ]);

        $medecin->update($validated);

        return redirect()->route('medecins.index')
            ->with('success', 'Médecin mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Medecin $medecin)
    {
        $medecin->delete();
        
    }

    /**
     * Get medecin details with additional info for API.
     */
    public function getMedecinDetails($medecinId)
    {
        $medecin = Medecin::with(['personne', 'hopital', 'admissions'])->findOrFail($medecinId);
        return response()->json([
            'status' => $medecin->status,
            'contrat' => $medecin->contrat,
            'licence_medicale' => $medecin->licence_medicale,
            'nom' => $medecin->personne->nom,
            'prenom' => $medecin->personne->prenom,
            'hopital' => $medecin->hopital,
            'admissions' => $medecin->admissions,
        ]);
    }
}
