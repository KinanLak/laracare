<?php

namespace App\Http\Controllers;

use App\Models\Hopital;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class HopitalController extends Controller
{
    private function generateHopitalId()
    {
        $prefix = 'HOP';
        $random = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        return $prefix . $random;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hopitals = Hopital::all();
        return Inertia::render('Hopital', [
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
            'nom' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'telephone' => 'required|string|max:255',
            'ville' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'directeur' => 'required|string|max:255',
        ]);

        $validated['id'] = $this->generateHopitalId();
        $hopital = Hopital::create($validated);

        return redirect()->back()
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

    /**
     * Get all hopitals for API.
     */
    public function getHopitals()
    {
        $hopitals = Hopital::all();
        return response()->json($hopitals);
    }
}
