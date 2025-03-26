<?php

namespace App\Http\Controllers;

use App\Models\Personne;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PersonneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $personnes = Personne::all();
        return Inertia::render('Personne/Index', [
            'personnes' => $personnes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Personne/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'dni' => 'required|string|max:255|unique:personnes',
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'age' => 'required|integer',
            'date_naissance' => 'required|date',
        ]);

        Personne::create($validated);

        return redirect()->route('personnes.index')
            ->with('success', 'Personne créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Personne $personne)
    {
        return Inertia::render('Personne/Show', [
            'personne' => $personne->load('patient')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Personne $personne)
    {
        return Inertia::render('Personne/Edit', [
            'personne' => $personne
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Personne $personne)
    {
        $validated = $request->validate([
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'age' => 'required|integer',
            'date_naissance' => 'required|date',
        ]);

        $personne->update($validated);

        return redirect()->route('personnes.index')
            ->with('success', 'Personne mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Personne $personne)
    {
        $personne->delete();

        return redirect()->route('personnes.index')
            ->with('success', 'Personne supprimée avec succès.');
    }

    /**
     * Get person by Dni.
     */
    public function getByDni($dni)
    {
        $personne = Personne::where('dni', $dni)->first();
        return response()->json($personne);
    }
}
