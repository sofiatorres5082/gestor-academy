<?php

namespace App\Http\Controllers;

use App\Models\Taller;
use Illuminate\Http\Request;

class TallerController extends Controller
{
    // GET /api/talleres
    public function index()
    {
        return Taller::whereNull('deleted_at') // solo activos si usás soft delete
            ->orderBy('created_at', 'desc')
            ->paginate(10); // 10 por página
    }

    public function show($id)
    {
        $taller = Taller::find($id);

        if (!$taller) {
            return response()->json(['message' => 'Taller no encontrado'], 404);
        }

        return response()->json($taller);
    }

    // GET /api/talleres/inactivos
    public function inactivos()
    {
        return Taller::onlyTrashed()
            ->orderBy('created_at', 'desc')
            ->paginate(10);
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

    // PUT /api/talleres/{id}/restaurar
    public function restore($id)
    {
        $taller = Taller::onlyTrashed()->find($id);

        if (!$taller) {
            return response()->json(['message' => 'Taller no encontrado o no está eliminado'], 404);
        }

        $taller->restore();

        return response()->json(['message' => 'Taller restaurado con éxito']);
    }
}