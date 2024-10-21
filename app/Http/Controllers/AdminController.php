<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection\given;
class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    public function index1()
    {

        return $users = User::all(); // Récupère toutes les données de la table "users"

        // response(["users"=>$users]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Admin::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate(
            $request,
            [
                'fname' => 'required|string|max:255',
                'lname' => 'required|string|max:255',
                'password' => 'required',
                'email' => 'required|string|max:255',
                'nbr_tel' => 'required|string|max:255',
            ]
        );
        return admin::create($request->all());
        /**redirect()->route('Students.index')
           ->with('info', 'Demande bien réçu !');*/
    }





    /**
     * Display the specified resource.
     *
     * return  Admin::all();
     */
    public function show()
    {
        $admins =admin::all();
        return response(["admins"=>$admins]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {

        return $admin;
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, Admin $admin)
    // {

    //     return $admin->update($request->all());
    // }


    public function update(Request $request, $id) {
        $admin = Admin::findOrFail($id);
        $admin->update($request->all());
        return response()->json($admin);
    }



    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(Admin $admin)
    // {

    //     return $admin->delete();
    // }



    public function destroy($id)
{
    $admin = Admin::findOrFail($id); // Ensure you are finding the user by ID
    $admin->delete();

    // Return a response to indicate success
    return response()->json(['message' => 'User deleted successfully.']);
}


// public function getUsersWithoutPermissions()
// {
//     $usersWithPermissions = Permission::pluck('user_id');  // Assume 'user_id' is the field name
//     $usersWithoutPermissions = User::whereNotIn('id', $usersWithPermissions)->get();
//     return response()->json($usersWithoutPermissions);
// }


public function getUsername($id)
{
    $admins = admin::findOrFail($id);
    return response()->json(['nom' => $admins->nom]);
}


}
// public function usersWithoutPermissions()
// {
//     $usersWithPermissions = Permission::select('user_id')->distinct()->pluck('user_id');
//     $usersWithoutPermissions = User::whereNotIn('id', $usersWithPermissions)->get();
//     return response()->json($usersWithoutPermissions);
// }
