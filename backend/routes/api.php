<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SocioController;
use App\Http\Controllers\TallerController;
use App\Http\Controllers\SocioTallerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/auth/check', [AuthController::class, 'check']);

    Route::get('socios/inactivos', [SocioController::class, 'inactivos']);
    Route::put('socios/{id}/restaurar', [SocioController::class, 'restore']);
    Route::put('socios/{id}', [SocioController::class, 'update']);

    Route::get('talleres/inactivos', [TallerController::class, 'inactivos']);
    Route::put('talleres/{id}/restaurar', [TallerController::class, 'restore']);
    Route::put('talleres/{id}', [TallerController::class, 'update']);

    Route::post('inscripciones/{socioId}/{tallerId}', [SocioTallerController::class, 'inscribir']);
    Route::get('socios/{id}/talleres', [SocioTallerController::class, 'talleresDeSocio']);
    Route::get('talleres/{id}/socios', [SocioTallerController::class, 'sociosDeTaller']);
    Route::delete('/inscripciones/{socioId}/{tallerId}', [SocioTallerController::class, 'desinscribir']);

    Route::get('/admin/dashboard/resumen', [DashboardController::class, 'resumen']);

    Route::apiResource('socios', SocioController::class);
    Route::apiResource('talleres', TallerController::class);
});



