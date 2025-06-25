<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SocioController;
use App\Http\Controllers\TallerController;

Route::get('socios/inactivos', [SocioController::class, 'inactivos']);
Route::put('socios/{id}/restaurar', [SocioController::class, 'restore']);
Route::put('socios/{id}', [SocioController::class, 'update']);

Route::get('talleres/inactivos', [TallerController::class, 'inactivos']);
Route::put('talleres/{id}/restaurar', [TallerController::class, 'restore']);
Route::put('talleres/{id}', [TallerController::class, 'update']);

Route::apiResource('socios', SocioController::class);
Route::apiResource('talleres', TallerController::class);


