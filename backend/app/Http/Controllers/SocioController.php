<?php

namespace App\Http\Controllers;

use App\Models\Socio;
use Illuminate\Http\Request;

class SocioController extends Controller
{
    // GET /api/socios
    public function index()
    {
        return response()->json(Socio::all()); // trae a los activos por defecto
    }

    // GET /api/socios/{id}
    public function show($id)
    {
        $socio = Socio::find($id);

        if (!$socio) {
            return response()->json(['message' => 'Socio no encontrado'], 404);
        }

        return response()->json($socio);
    }

    // GET /api/socios/inactivos
    public function inactivos()
    {
        $socios = Socio::onlyTrashed()->get();
        return response()->json($socios);
    }

    // POST /api/socios
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string',
            'email' => 'required|email|unique:socios',
            'dni' => 'required|unique:socios',
            'telefono' => 'nullable|string',
            'direccion' => 'nullable|string',
            'fecha_nacimiento' => 'nullable|date',
        ]);

        $socio = Socio::create($validated);

        return response()->json($socio, 201);
    }

    // PUT /api/socios/{id}/restaurar
    public function restore($id)
    {
        $socio = Socio::onlyTrashed()->find($id);

        if (!$socio) {
            return response()->json(['message' => 'Socio no encontrado o no está eliminado'], 404);
        }

        $socio->restore();

        return response()->json(['message' => 'Socio restaurado con éxito']);
    }


    // PUT /api/socios/{id}
    public function update(Request $request, $id)
    {
        $socio = Socio::find($id);

        if (!$socio) {
            return response()->json(['message' => 'Socio no encontrado'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'sometimes|string',
            'email' => 'sometimes|email|unique:socios,email,' . $socio->id,
            'dni' => 'sometimes|unique:socios,dni,' . $socio->id,
            'telefono' => 'nullable|string',
            'direccion' => 'nullable|string',
            'fecha_nacimiento' => 'nullable|date',
        ]);

        $socio->update($validated);

        return response()->json($socio);
    }

    // DELETE /api/socios/{id}
    public function destroy($id)
    {
        $socio = Socio::find($id);

        if (!$socio) {
            return response()->json(['message' => 'Socio no encontrado'], 404);
        }

        $socio->delete();

        return response()->json(['message' => 'Socio eliminado']);
    }
}
