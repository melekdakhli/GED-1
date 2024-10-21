<?php

namespace App\Http\Controllers;

use App\Models\categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function indexC()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createC()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeC(Request $request)
    {

        $this->validate(
            $request,
            [
                'nom' => 'required|string|max:255',
               


            ]
        );
        return categorie::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function showC(categorie $categorie)
    {
        
        return  $categorie =categorie::all();
        //response(["categorie"=>$categorie]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function editC(categorie $categorie)
    {
        return $categorie;
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateC(Request $request, categorie $categorie)
    {

        $categorie->update($request->all());
        return response()->json($categorie);



        //return $categorie->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroyC(categorie $categorie)
    // {
    //     return $categorie->delete();
    // }


    public function destroyC(Categorie $categorie) {
        $categorie->delete();
        return response()->json(['message' => 'Categorie deleted successfully']);
    }
}
