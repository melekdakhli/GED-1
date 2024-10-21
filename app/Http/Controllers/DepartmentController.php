<?php

namespace App\Http\Controllers;

use App\Models\department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     //ajouter par helmi
    public function indexDP()
    {
        $pageSize = 5; // Vous pouvez passer cela comme paramètre ou définir une constante pour cela
        $departments = Department::paginate($pageSize);
        return response()->json($departments); // Laravel inclut déjà le total avec paginate
    }


    /**
     * Show the form for creating a new resource.
     */
    public function createDP()
    {
        return department::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeDP(Request $request)
    {
        $this->validate(
            $request,
            [
                'nom' => 'required|string|max:255',

            ]
        );
        return department::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function showDP(department $department)
    {
         $departments =department::all();
         return response(["departments"=>$departments]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function editDP(department $department)
    {
        return $department;
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateDP(Request $request, Department $department)
    {
   
        $department->update($request->all());
        return response()->json($department);
    }


    /**
     * Remove the specified resource from storage.
     */
    // public function destroyDP(department $department)
    // {
    //     return $department->delete();
    // }

    public function destroyDP(Department $department) {
        $department->delete();
        return response()->json(['message' => 'Department deleted successfully']);
    }

}
