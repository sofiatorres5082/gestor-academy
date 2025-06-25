<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class SocioTaller extends Pivot
{
    protected $table = 'socio_taller';

    protected $fillable = ['socio_id', 'taller_id', 'fecha_inscripcion'];
}

