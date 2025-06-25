<?php

namespace App\Http\Controllers;

use App\Models\Taller;
use Illuminate\Http\Request;

class TallerController extends Controller
{
    public function index()
    {
        return response()->json(Taller::all());
    }

    public function show($id)
    {
        $taller = Taller::find($id);

        if (!$taller) {
            return response()->json(['message' => 'Taller no encontrado'], 404);
        }

        return response()->json($taller);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string',
            'descripcion' => 'nullable|string',
            'profesor' => 'nullable|string',
            'dias' => 'nullable|string',
            'horario' => 'nullable|string',
        ]);

        $taller = Taller::create($validated);

        return response()->json($taller, 201);
    }

    public function update(Request $request, $id)
    {
        $taller = Taller::find($id);

        if (!$taller) {
            return response()->json(['message' => 'Taller no encontrado'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'sometimes|string',
            'descripcion' => 'nullable|string',
            'profesor' => 'nullable|string',
            'dias' => 'nullable|string',
            'horario' => 'nullable|string',
        ]);

        $taller->update($validated);

        return response()->json($taller);
    }

    public function destroy($id)
    {
        $taller = Taller::find($id);

        if (!$taller) {
            return response()->json(['message' => 'Taller no encontrado'], 404);
        }

        $taller->delete();

        return response()->json(['message' => 'Taller eliminado']);
    }
}
