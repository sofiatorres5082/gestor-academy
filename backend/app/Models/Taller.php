<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Taller extends Model
{
    // Un taller puede tener muchos socios a través de la tabla intermedia socio_taller
    public function socios()
    {
        return $this->belongsToMany(Socio::class, 'socio_taller');
    }
}
