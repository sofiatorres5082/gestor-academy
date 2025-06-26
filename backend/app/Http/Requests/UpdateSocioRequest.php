<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSocioRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $id = $this->route('id');


        return [
            'nombre' => 'sometimes|string|max:100',
            'email' => 'sometimes|email|unique:socios,email,' . $id . '|max:100',
            'dni' => ['sometimes', 'digits:8', 'unique:socios,dni,' . $id],
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
