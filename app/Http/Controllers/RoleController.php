<?php

namespace App\Http\Controllers;

use App\Models\role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function indexR()
    {
        $pageSize = 5; // Vous pouvez passer cela comme paramètre ou définir une constante pour cela
        $roles = Role::paginate($pageSize);
        return response()->json($roles); // Laravel inclut déjà le total avec paginate
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createR()
    {
        return role::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeR(Request $request)
    {

        $this->validate(
            $request,
            [
                'nom' => 'required|string|max:255',
            ]
        );
        return role::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function showR(role $role)
    {
        $roles =Role::all();
        return response(["roles"=>$roles]);


        // $roles = Role::paginate(5); // Ici '5' devrait être remplacé par une variable si nécessaire.
        // return response()->json($roles);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function editR( $id)
    {
        $role = Role::findOrFail($id);
        return $role;
    }

    /**
     * Update the specified resource in storage.
     */
    //ajouter par helmi
    public function updateR(Request $request,Role $role)
{
    //$role = Role::findOrFail($id); // Trouver le rôle par ID
   
    $role->update($request->all());
    return response()->json($role);
}


    /**
     * Remove the specified resource from storage.
     */
    // public function destroyR(role $role)
    // {
    //     return $role->delete();
    // }


    public function destroyR(Role $role) {
        $role->delete();
        return response()->json(['message' => 'Role deleted successfully']);
    }
}
