<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSocioRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nombre' => 'required|string|max:100',
            'email' => 'required|email|unique:socios,email|max:100',
            'dni' => 'required|digits:8|unique:socios,dni',
            'telefono' => ['nullable', 'regex:/^[0-9]{7,15}$/'],
            'direccion' => 'nullable|string|max:255',
            'fecha_nacimiento' => 'nullable|date|before:today',
        ];
    }

    public function messages()
    {
        return [
            'dni.digits' => 'El DNI debe tener exactamente 8 dígitos.',
            'telefono.regex' => 'El teléfono debe contener entre 7 y 15 números.',
            'fecha_nacimiento.before' => 'La fecha de nacimiento debe ser anterior a hoy.',
        ];
    }
}
