<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);
Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('attente', [\App\Http\Controllers\AuthController::class, 'attente']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [\App\Http\Controllers\AuthController::class, 'user']);
    Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    Route::post('refreshToken', [\App\Http\Controllers\AuthController::class, 'refreshToken']);


});

Route::get('getUsername', [\App\Http\Controllers\AdminController::class,'getUsername']);


    Route::resource('admins', \App\Http\Controllers\AdminController::class);
    Route::get('create', [\App\Http\Controllers\AdminController::class, 'create']);
    Route::post('store', [\App\Http\Controllers\AdminController::class, 'store']);
    Route::get('show', [\App\Http\Controllers\AuthController::class, 'show']);
    Route::put('update/{id}', [\App\Http\Controllers\AuthController::class, 'update']);
    Route::put('update1/{id}', [\App\Http\Controllers\AuthController::class, 'update1']);
    Route::delete('/destroy/{id}', [\App\Http\Controllers\AuthController::class, 'destroy']);
    Route::get('edit', [\App\Http\Controllers\AuthController::class, 'edit']);
    Route::get('index1', [\App\Http\Controllers\AdminController::class, 'index1']);// table register
   

//API department
// Ajoutez cette ligne dans votre fichier routes/api.php
Route::get('indexDP', [\App\Http\Controllers\DepartmentController::class, 'indexDP']);//ajouter par helmi


    Route::get('createDP', [\App\Http\Controllers\DepartmentController::class, 'createDP']);
    Route::post('storeDP', [\App\Http\Controllers\DepartmentController::class, 'storeDP']);
    Route::get('showDP', [\App\Http\Controllers\DepartmentController::class, 'showDP']);
    Route::put('updateDP/{department}', [\App\Http\Controllers\DepartmentController::class, 'updateDP']);//modifier par helmi
    Route::delete('/destroyDP/{department}', [\App\Http\Controllers\DepartmentController::class, 'destroyDP']);// mochkla fi delete lzmny nl9lha 7al
    Route::get('editDP', [\App\Http\Controllers\DepartmentController::class, 'editDP']);
 //api role
 Route::get('indexR', [\App\Http\Controllers\RoleController::class, 'indexR']);//ajouter par helmi

    Route::get('createR', [\App\Http\Controllers\RoleController::class, 'createR']);
    Route::post('storeR', [\App\Http\Controllers\RoleController::class, 'storeR']);
    Route::get('showR', [\App\Http\Controllers\RoleController::class, 'showR']);
    Route::put('updateR/{role}', [\App\Http\Controllers\RoleController::class, 'updateR']);//modifier par helmi
    Route::delete('/destroyR/{role}', [\App\Http\Controllers\RoleController::class, 'destroyR']);// mochkla fi delete lzmny nl9lha 7al
    Route::get('editR', [\App\Http\Controllers\RoleController::class, 'editR']);
//api catrgories
    Route::get('createC', [\App\Http\Controllers\CategorieController::class, 'createC']);
    Route::post('storeC', [\App\Http\Controllers\CategorieController::class, 'storeC']);
    Route::get('showC', [\App\Http\Controllers\CategorieController::class, 'showC']);
    Route::put('updateC/{categorie}', [\App\Http\Controllers\CategorieController::class, 'updateC']);
    Route::delete('/destroyC/{categorie}', [\App\Http\Controllers\CategorieController::class, 'destroyC']);// mochkla fi delete lzmny nl9lha 7al
    Route::get('editC', [\App\Http\Controllers\CategorieController::class, 'editC']);
//api documents
    Route::get('createD', [\App\Http\Controllers\DocumentsController::class, 'createD']);
    Route::post('storeD', [\App\Http\Controllers\DocumentsController::class, 'storeD']);
    Route::get('showD', [\App\Http\Controllers\DocumentsController::class, 'showD']);
    Route::put('updateD/{id}', [\App\Http\Controllers\DocumentsController::class, 'updateD']);
    Route::delete('/destroyD/{document}', [\App\Http\Controllers\DocumentsController::class, 'destroyD']);// mochkla fi delete lzmny nl9lha 7al
    Route::get('editD', [\App\Http\Controllers\DocumentsController::class, 'editD']);
    Route::get('downloadD/{id}', [\App\Http\Controllers\DocumentsController::class, 'downloadD']);
    Route::get('previewD/{id}', [\App\Http\Controllers\DocumentsController::class, 'previewD']);
    Route::post('searchDocuments', [\App\Http\Controllers\DocumentsController::class, 'searchDocuments']);
    Route::post('mail/{id}', [\App\Http\Controllers\DocumentsController::class, 'mail']);



//api permission
    Route::get('createP', [\App\Http\Controllers\PermissionController::class, 'createP']);
    Route::post('storeP', [\App\Http\Controllers\PermissionController::class, 'storeP']);
    Route::get('showP', [\App\Http\Controllers\PermissionController::class, 'showP']);
    Route::put('updateP/{permission}', [\App\Http\Controllers\PermissionController::class, 'updateP']);
    Route::delete('/destroyP/{permission}', [\App\Http\Controllers\PermissionController::class, 'destroyP']);// mochkla fi delete lzmny nl9lha 7al
    Route::get('editP', [\App\Http\Controllers\PermissionController::class, 'editP']);
// api Client
Route::get('createClient', [\App\Http\Controllers\ClientController::class, 'createClient']);
Route::post('storeClient', [\App\Http\Controllers\ClientController::class, 'storeClient']);
Route::get('showClient', [\App\Http\Controllers\ClientController::class, 'showClient']);
Route::put('updateClient/{id}', [\App\Http\Controllers\ClientController::class, 'updateClient']);
Route::delete('/destroyClient/{document}', [\App\Http\Controllers\ClientController::class, 'destroyClient']);// mochkla fi delete lzmny nl9lha 7al
Route::get('editClient', [\App\Http\Controllers\ClientController::class, 'editClient']);
Route::get('downloadClient/{id}', [\App\Http\Controllers\ClientController::class, 'downloadClient']);
Route::get('previewClient/{id}', [\App\Http\Controllers\ClientController::class, 'previewClient']);
//api Formation
Route::get('createFormation', [\App\Http\Controllers\FormationController ::class, 'createFormation']);
Route::post('storeFormation', [\App\Http\Controllers\FormationController ::class, 'storeFormation']);
Route::get('showFormation', [\App\Http\Controllers\FormationController ::class, 'showFormation']);
Route::put('updateFormation/{id}', [\App\Http\Controllers\FormationController ::class, 'updateFormation']);
Route::delete('/destroyFormation/{document}', [\App\Http\Controllers\FormationController ::class, 'destroyFormation']);// mochkla fi delete lzmny nl9lha 7al
Route::get('editFormation', [\App\Http\Controllers\FormationController ::class, 'editFormation']);
Route::get('downloadFormation/{id}', [\App\Http\Controllers\FormationController ::class, 'downloadFormation']);
Route::get('previewFormation/{id}', [\App\Http\Controllers\FormationController ::class, 'previewFormation']);
//api Fournisseur
Route::get('createFournisseur', [\App\Http\Controllers\FournisseurController::class, 'createFournisseur']);
Route::post('storeFournisseur', [\App\Http\Controllers\FournisseurController::class, 'storeFournisseur']);
Route::get('showFournisseur', [\App\Http\Controllers\FournisseurController::class, 'showFournisseur']);
Route::put('updateFournisseur/{id}', [\App\Http\Controllers\FournisseurController::class, 'updateFournisseur']);
Route::delete('/destroyFournisseur/{document}', [\App\Http\Controllers\FournisseurController::class, 'destroyFournisseur']);// mochkla fi delete lzmny nl9lha 7al
Route::get('editFournisseur', [\App\Http\Controllers\FournisseurController::class, 'editFournisseur']);
Route::get('downloadFournisseur/{id}', [\App\Http\Controllers\FournisseurController::class, 'downloadFournisseur']);
Route::get('previewFournisseur/{id}', [\App\Http\Controllers\FournisseurController::class, 'previewFournisseur']);
//api Rh 
Route::get('createRh', [\App\Http\Controllers\RhController::class, 'createRh']);
Route::post('storeRh', [\App\Http\Controllers\RhController::class, 'storeRh']);
Route::get('showRh', [\App\Http\Controllers\RhController::class, 'showRh']);
Route::put('updateRh/{id}', [\App\Http\Controllers\RhController::class, 'updateRh']);
Route::delete('/destroyRh/{document}', [\App\Http\Controllers\RhController::class, 'destroyRh']);// mochkla fi delete lzmny nl9lha 7al
Route::get('editRh', [\App\Http\Controllers\RhController::class, 'editD']);
Route::get('downloadRh/{id}', [\App\Http\Controllers\RhController::class, 'downloadRh']);
Route::get('previewRh/{id}', [\App\Http\Controllers\RhController::class, 'previewRh']);
//api   Technique
Route::get('createTechnique', [\App\Http\Controllers\TechniqueController::class, 'createTechnique']);
Route::post('storeTechnique', [\App\Http\Controllers\TechniqueController::class, 'storeTechnique']);
Route::get('showTechnique', [\App\Http\Controllers\TechniqueController::class, 'showTechnique']);
Route::put('updateTechnique/{id}', [\App\Http\Controllers\TechniqueController::class, 'updateTechnique']);
Route::delete('/destroyTechnique/{document}', [\App\Http\Controllers\TechniqueController::class, 'destroyTechnique']);// mochkla fi delete lzmny nl9lha 7al
Route::get('editTechnique', [\App\Http\Controllers\TechniqueController::class, 'editTechnique']);
Route::get('downloadTechnique/{id}', [\App\Http\Controllers\TechniqueController::class, 'downloadTechnique']);
Route::get('previewTechnique/{id}', [\App\Http\Controllers\TechniqueController::class, 'previewTechnique']);