<?php

namespace App\Http\Controllers;

use App\Models\Socio;
use App\Models\Taller;
use Illuminate\Http\Request;

class SocioTallerController extends Controller
{
    public function inscribir($socioId, $tallerId)
    {
        $socio = Socio::find($socioId);
        $taller = Taller::find($tallerId);

        if (!$socio || !$taller) {
            return response()->json(['message' => 'Socio o taller no encontrado'], 404);
        }

        if ($socio->talleres()->where('taller_id', $tallerId)->exists()) {
            return response()->json(['message' => 'Este socio ya está inscrito en este taller'], 409);
        }


        $socio->talleres()->attach($tallerId, [
            'fecha_inscripcion' => now()
        ]);

        return response()->json(['message' => 'Socio inscrito al taller con éxito']);
    }

    public function talleresDeSocio($id)
    {
        $socio = Socio::with('talleres')->find($id);

        if (!$socio) {
            return response()->json(['message' => 'Socio no encontrado'], 404);
        }

        return response()->json($socio->talleres);
    }

    public function sociosDeTaller($id)
    {
        $taller = Taller::with('socios')->find($id);

        if (!$taller) {
            return response()->json(['message' => 'Taller no encontrado'], 404);
        }

        return response()->json($taller->socios);
    }

    public function desinscribir($socioId, $tallerId)
    {
        $socio = Socio::find($socioId);

        if (!$socio) {
            return response()->json(['message' => 'Socio no encontrado'], 404);
        }

        $socio->talleres()->detach($tallerId);

        return response()->json(['message' => 'Socio desinscrito del taller']);
    }

}
