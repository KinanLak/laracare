<?php

namespace App\Http\Controllers;

use App\Models\Chambre;
use App\Models\Unite;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChambreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $chambres = Chambre::with('unite')->get();
        return Inertia::render('Chambre/Index', [
            'chambres' => $chambres
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $unites = Unite::all();
        return Inertia::render('Chambre/Create', [
            'unites' => $unites
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255|unique:chambres',
            'capacite' => 'required|integer',
            'surface' => 'required|numeric',
            'etage' => 'required|string|max:255',
            'description' => 'nullable|string',
            'equipements' => 'nullable|string',
            'unite_code' => 'required|string|exists:unites,code',
        ]);

        Chambre::create($validated);

        return redirect()->route('chambres.index')
            ->with('success', 'Chambre créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Chambre $chambre)
    {
        return Inertia::render('Chambre/Show', [
            'chambre' => $chambre->load(['unite', 'admissions'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chambre $chambre)
    {
        $unites = Unite::all();
        return Inertia::render('Chambre/Edit', [
            'chambre' => $chambre,
            'unites' => $unites
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chambre $chambre)
    {
        $validated = $request->validate([
            'capacite' => 'required|integer',
            'surface' => 'required|numeric',
            'etage' => 'required|string|max:255',
            'description' => 'nullable|string',
            'equipements' => 'nullable|string',
            'unite_code' => 'required|string|exists:unites,code',
        ]);

        $chambre->update($validated);

        return redirect()->route('chambres.index')
            ->with('success', 'Chambre mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chambre $chambre)
    {
        $chambre->delete();

        return redirect()->route('chambres.index')
            ->with('success', 'Chambre supprimée avec succès.');
    }
}
