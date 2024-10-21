<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\Token;
use Mail;
use App\Mail\NewMail;
use App\Mail\newMail1;
use App\Mail\newMail2;


class AuthController extends Controller
{
    public function register(Request $request)
    {
     
        $validator = Validator::make($request->all(), [
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'email' => 'required|string',
            'cin' => 'required|string',
            'nbr_tel' => 'required|string',
            'role_id' => 'string',
            'status'=>'string',
            'department_id' => 'string',
            'password' => 'required|string',
            'cpassword' => 'required|string|same:password',
        ]);
       $user=  User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'cin' => $request->cin,
            'nbr_tel' => $request->nbr_tel,
            'role_id' => $request->role_id,
            'status' => $request->status,
            'department_id' => $request->department_id,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
       
        $data= $request->fname;
        $MailData =$request->password;

        Mail::to( $user->email)->send(new NewMail($MailData,$data));
         return $user;
    }
    public function attente(Request $request)
    {
     
        $validator = Validator::make($request->all(), [
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'email' => 'required|string',
            'cin' => 'required|string',
            'nbr_tel' => 'required|string',
            'status' => 'required|string',
            'password' => 'required|string',
            'cpassword' => 'required|string|same:password',
        ]);
       $user=  User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'cin' => $request->cin,
            'nbr_tel' => $request->nbr_tel,
            
            'status'=>$request->status,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
       
        Mail::to($user->email)->send(new newMail1($user->fname));
         return $user;
    }
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response([
                'message' => 'Invalid credentials!'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = auth()->user();
        if ($user->status !== 'oui') {
            return response([
                'message' => 'Your account is not active!'
            ], Response::HTTP_UNAUTHORIZED);
        }
        $accessToken = auth()->claims([
            'user_id' => $user->id,
            'user_fname' => $user->fname,
            'user_lname' => $user->lname,
            'email' => $user->email,
            'role_id'=>$user->role_id,
            'department_id'=>$user->department_id
        ])->attempt($request->only('email', 'password'));

    
       $refreshToken = JWTAuth::claims(['typ' => 'refresh'])->fromUser($user);
    
        // Store tokens in the database
      token::create([
            'user_id'=> $user->id,
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
            'access_token_expires_at' => now()->addMinutes(config('jwt.ttl')),
            'refresh_token_expires_at' => now()->addDays(config('jwt.refresh_ttl'))
        ]);
        return response()->json([
            'message' => 'Login successful!',
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken
        ]);
    }
    
    public function user()
    {
        return Auth::user();
    }


   
    public function refreshToken(Request $request)
{
    $currentToken = $request->token; // Assume the current token is passed somehow, adjust based on your setup
    try {
        // Assuming you have a way to validate the refresh token, then issue a new token
        if (true /* validate the refresh token */) {
            $newToken = auth()->refresh(true, true); // This would refresh the token. Customize based on your actual refresh logic.
            return response()->json(['access_token' => $newToken]);
        }
    } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
        return response()->json(['error' => 'Token is invalid'], 401);
    }
    // Additional error handling as necessary
}
public function edit($id)
    {

        $user = User::findOrFail($id);
        return $user;
    }

public function update(Request $request, $id) {
    $user = User::findOrFail($id);
    $user->update($request->all());
    return response()->json($user);
}

public function update1(Request $request, $id) {
    $user = User::findOrFail($id);
    $user->update($request->all());
    Mail::to($user->email)->send(new newMail2($user->fname));
    return response()->json($user);

}
public function destroy($id)
{
    $User = User::findOrFail($id); // Ensure you are finding the user by ID
    $User->delete();

    // Return a response to indicate success
    return response()->json(['message' => 'User deleted successfully.']);
}

}
