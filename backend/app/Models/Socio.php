<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Socio extends Model
{
    protected $fillable = [
        'nombre',
        'email',
        'dni',
        'telefono',
        'direccion',
        'fecha_nacimiento',
    ];

    // Un socio puede tener muchos talleres a través de la tabla intermedia socio_taller
    public function talleres()
    {
        return $this->belongsToMany(Taller::class, 'socio_taller');
    }
}
