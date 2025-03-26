<?php

namespace App\Http\Controllers;

use App\Models\Hopital;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HopitalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hopitals = Hopital::all();
        return Inertia::render('Hopital/Index', [
            'hopitals' => $hopitals
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Hopital/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|string|max:255|unique:hopitals',
            'nom' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'telephone' => 'required|string|max:255',
            'ville' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'directeur' => 'required|string|max:255',
        ]);

        Hopital::create($validated);

        return redirect()->route('hopitals.index')
            ->with('success', 'Hôpital créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Hopital $hopital)
    {
        return Inertia::render('Hopital/Show', [
            'hopital' => $hopital->load('medecins')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hopital $hopital)
    {
        return Inertia::render('Hopital/Edit', [
            'hopital' => $hopital
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hopital $hopital)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'telephone' => 'required|string|max:255',
            'ville' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'directeur' => 'required|string|max:255',
        ]);

        $hopital->update($validated);

        return redirect()->route('hopitals.index')
            ->with('success', 'Hôpital mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hopital $hopital)
    {
        $hopital->delete();

        return redirect()->route('hopitals.index')
            ->with('success', 'Hôpital supprimé avec succès.');
    }

    /**
     * Get hopital details with medecins for API.
     */
    public function getHopitalDetails($id)
    {
        $hopital = Hopital::with('medecins')->findOrFail($id);
        return response()->json([
            'nom' => $hopital->nom,
            'adresse' => $hopital->adresse,
            'telephone' => $hopital->telephone,
            'ville' => $hopital->ville,
            'email' => $hopital->email,
            'directeur' => $hopital->directeur,
            'medecins' => $hopital->medecins
        ]);
    }
}
