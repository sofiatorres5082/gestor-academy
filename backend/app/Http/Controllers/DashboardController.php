<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Taller;
use App\Models\Socio;

class DashboardController extends Controller
{
    public function resumen()
    {
        return response()->json([
            'total_inscripciones' => DB::table('socio_taller')->count(),
            'taller_mas_popular' => Taller::withCount('socios')->orderByDesc('socios_count')->first(['id', 'nombre']),
            'socio_mas_participativo' => Socio::withCount('talleres')->orderByDesc('talleres_count')->first(['id', 'nombre']),
            'talleres_sin_inscriptos' => Taller::doesntHave('socios')->get(['id', 'nombre']),
        ]);
    }
}
