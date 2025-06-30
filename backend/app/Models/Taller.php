<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Taller extends Model
{
    use SoftDeletes;

    protected $table = 'talleres';

    protected $fillable = [
        'nombre',
        'descripcion',
        'profesor',
        'dias',
        'horario',
    ];

    // Un taller puede tener muchos socios a través de la tabla intermedia socio_taller
    public function socios()
    {
        return $this->belongsToMany(Socio::class, 'socio_taller')
            ->withPivot('fecha_inscripcion');
    }
}
