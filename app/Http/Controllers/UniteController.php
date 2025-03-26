<?php

namespace App\Http\Controllers;

use App\Models\Unite;
use App\Models\Hopital;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UniteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $unites = Unite::with('hopital')->get();
        return Inertia::render('Unite/Index', [
            'unites' => $unites
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hopitals = Hopital::all();
        return Inertia::render('Unite/Create', [
            'hopitals' => $hopitals
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:unites',
            'nom' => 'required|string|max:255',
            'responsable' => 'required|string|max:255',
            'specialite' => 'required|string|max:255',
            'capacite' => 'required|integer',
            'batiment' => 'required|string|max:255',
            'localization' => 'required|string|max:255',
            'equipements' => 'nullable|string',
            'hopital_id' => 'required|string|exists:hopitals,id',
        ]);

        Unite::create($validated);

        return redirect()->route('unites.index')
            ->with('success', 'Unité créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Unite $unite)
    {
        return Inertia::render('Unite/Show', [
            'unite' => $unite->load(['chambres', 'admissions', 'hopital'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Unite $unite)
    {
        return Inertia::render('Unite/Edit', [
            'unite' => $unite
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Unite $unite)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'responsable' => 'required|string|max:255',
            'specialite' => 'required|string|max:255',
            'capacite' => 'required|integer',
            'batiment' => 'required|string|max:255',
            'localization' => 'required|string|max:255',
            'equipements' => 'nullable|string',
        ]);

        $unite->update($validated);

        return redirect()->route('unites.index')
            ->with('success', 'Unité mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Unite $unite)
    {
        $unite->delete();

    }

    /**
     * Get Unite details with chambres and admissions for API.
     */
    public function getUniteDetails($code)
    {
        $unite = Unite::with(['chambres', 'admissions', 'hopital'])
            ->where('code', $code)
            ->firstOrFail();
        return response()->json($unite);
    }
}
