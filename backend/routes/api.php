<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SocioController;
use App\Http\Controllers\TallerController;

Route::apiResource('socios', SocioController::class);
Route::apiResource('talleres', TallerController::class);

?>