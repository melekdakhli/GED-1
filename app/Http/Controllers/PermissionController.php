<?php

namespace App\Http\Controllers;

use App\Models\permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function indexP()
    {
        $permissions = Permission::all();
        return response()->json($permissions);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createP()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function storeP(Request $request)
    // {

    //     $this->validate(
    //         $request,
    //         [


    //         ]
    //     );
    //     return permission::create($request->all());
    // }

    public function storeP(Request $request)
{
    $request->validate([
        'role_id' => 'required',
         'create' => 'required',
            'show' => 'required',
            'delete' => 'required',
            'modifier' => 'required',
            'telech'=>'required'
    ]);

    return permission::create($request->all());

}


    /**
     * Display the specified resource.
     */
    public function showP(permission $permission)
    {
        return $permission::all();
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function editP(permission $permission)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function updateP(Request $request, permission $permission)
    {
      

        $permission->update($request->all());
        return response()->json($permission);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyP(permission $permission)
    {
        $permission->delete();
        return response()->json(['message' => 'Permission deleted successfully']);
    }
}
