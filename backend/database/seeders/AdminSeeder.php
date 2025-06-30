<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
   public function run()
{
    Admin::create([
        'nombre' => 'Administrador',
        'email' => 'admin@example.com',
        'password' => Hash::make('admin123'),
    ]);
}
}
