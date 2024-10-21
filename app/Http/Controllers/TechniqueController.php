<?php

namespace App\Http\Controllers;

use App\Models\Technique;
use Illuminate\Http\Request;
use App\Models\documents;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\BinaryFileResponse;


class TechniqueController extends Controller
{/**
     * Display a listing of the resource.
     */
    public function indexTechnique()
    {
        $document = Technique::all();
        return response()->json($document);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createTechnique()
    {
        return Technique::all();
    }

    /**
     * Store a newly created resource in storage.
     */
  /**
 * Enregistre une nouvelle ressource dans le stockage.
 */
public function storeTechnique(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'categorie' => 'required|string|max:255',
        'taille' => 'required|string|max:255', // Ajout de la validation pour "taille"
        'motcle' => 'required|string|max:255', // Ajout de la validation pour "mot_cle"
        'creationDate' => 'required|date', // Renommage de "dateexpiration" en "creationDate"
        'file' => 'required|file',
        'user_id' => 'required|string|max:255',
    ]);
    $document = new Technique();
    $document->name = $validatedData['name'];
    $document->categorie = $validatedData['categorie'];
    $document->taille = $validatedData['taille']; // Assignation de la valeur pour "taille"
    $document->motcle = $validatedData['motcle']; // Assignation de la valeur pour "mot_cle"
    $document->creationDate = $validatedData['creationDate']; // Assignation de la valeur pour "creationDate"
    $document->user_id = $validatedData['user_id']; // Assignation de la valeur pour "creationDate"

    // Assurez-vous que l'utilisateur est authentifié avant d'accéder à l'id utilisateur
    // if (auth()->check()) {
    //     $document->user_id = auth()->user()->id;
    // } else {
    //     return response()->json(['message' => 'Non Authentifié'], 401);
    // }

    if ($request->hasFile('file')) {
        $path = $request->file('file')->store('documents', 'public');
        $document->file = $path; // Stockez le chemin d'accès au fichier
    }

    $document->save();

    // Retourner le document enregistré au lieu de créer un nouveau
    return response()->json($document);
}



    /**
     * Display the specified resource.
     */
    public function showTechnique(Technique $Technique)
    {
        $documents = technique::all();

       // Convertir les données binaires en base64
       $documentsArray = $documents->map(function ($document) {
          $document->file = base64_encode($document->file);
           return $document;
       });

    //return response()->json(['documents' => $documentsArray]);
        return response(["documents"=>$documents]);

    }


    /**
     * Show the form for editing the specified resource.
     */
    public function editTechnique(Technique $Technique)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateTechnique(Request $request, $id) { // L'ID doit être un paramètre ici
        $document = Technique::findOrFail($id);
        $document->update($request->all());
        return response()->json($document);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyTechnique($id) // Changez la signature pour utiliser l'ID directement
    {
      
        $document = technqiue::findOrFail($id);
        $filePath = storage_path('app/public/' . $document->file);

        if (!file_exists($filePath)) {
            abort(404);
        }

        $headers = [
            'Content-Disposition' => 'attachment; filename="' . basename($filePath) . '"',
        ];

        return response()->download($filePath, basename($filePath), $headers);
    }


    public function previewTechnique($id)
    {
        $document = technique::findOrFail($id);
        $filePath = storage_path('app/public/' . $document->file);
        
        if (!\File::exists($filePath)) {
            abort(404);
        }
        
        $mimeType = \File::mimeType($filePath);
        
        if ($mimeType === 'application/pdf' || $mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            // Pour les fichiers PDF et DOCX, renvoyer la réponse de fichier binaire
            return new BinaryFileResponse($filePath, 200, [
                'Content-Type' => $mimeType,
                'Content-Disposition' => 'inline; filename="' . $document->name . '"'
            ]);
        } else {
            // Pour les autres types de fichiers, renvoyer une réponse de fichier simple
            return response()->file($filePath, [
                'Content-Type' => $mimeType,
                'Content-Disposition' => 'inline; filename="' . $document->name . '"'
            ]);
        }
    }


}