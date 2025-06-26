<?php

namespace App\Http\Controllers;

use App\Models\Socio;
use Illuminate\Http\Request;
use App\Http\Requests\StoreSocioRequest;
use App\Http\Requests\UpdateSocioRequest;


class SocioController extends Controller
{

    // GET /api/socios
    public function index()
    {
        return Socio::whereNull('deleted_at') // solo activos si usás soft delete
            ->orderBy('created_at', 'desc')
            ->paginate(10); // 10 por página
    }


    public function show(Socio $socio)
    {
        return response()->json($socio);
    }

    // GET /api/socios/inactivos
    public function inactivos()
    {
        return Socio::onlyTrashed()
            ->orderBy('created_at', 'desc')
            ->paginate(10);
    }


    public function store(StoreSocioRequest $request)
    {
        $validated = $request->validated();

        $socioEliminado = Socio::onlyTrashed()
            ->where('email', $validated['email'])
            ->orWhere('dni', $validated['dni'])
            ->first();

        if ($socioEliminado) {
            $socioEliminado->restore();
            $socioEliminado->update($validated);
            return response()->json([
                'message' => 'Socio restaurado y actualizado',
                'socio' => $socioEliminado
            ]);
        }

        $socio = Socio::create($validated);

        return response()->json($socio, 201);
    }


    public function restore(Socio $socio)
    {
        if (!$socio->trashed()) {
            return response()->json(['message' => 'Socio no eliminado'], 404);
        }

        $socio->restore();

        return response()->json(['message' => 'Socio restaurado con éxito']);
    }

    public function update(UpdateSocioRequest $request, $id)
    {
        try {
            $socio = Socio::withTrashed()->findOrFail($id);

            $validated = $request->validated();
            $socio->update($validated);

            return response()->json($socio);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'linea' => $e->getLine(),
                'archivo' => $e->getFile(),
            ], 500);
        }
    }


    public function destroy(Socio $socio)
    {
        if ($socio->trashed()) {
            return response()->json(['message' => 'El socio ya estaba eliminado'], 409);
        }

        $socio->delete();

        return response()->json(['message' => 'Socio eliminado']);
    }
}
