<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Spatie\PdfToImage\Pdf;
use App\Models\documents;
use Illuminate\Http\Request;



class DocumentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function indexD()
    {
        $documents = documents::all();
        return response()->json($documents);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createD()
    {
        return documents::all();
    }

    /**
     * Store a newly created resource in storage.
     */
  /**
 * Enregistre une nouvelle ressource dans le stockage.
 */public function storeD(Request $request)
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
   

    $document = new documents(); // Utilisation du modèle Document au lieu de documents (en minuscule)
    $document->name = $validatedData['name'];
    $document->categorie = $validatedData['categorie'];
    $document->taille = $validatedData['taille']; // Assignation de la valeur pour "taille"
    $document->motcle = $validatedData['motcle']; // Assignation de la valeur pour "mot_cle"
    $document->creationDate = $validatedData['creationDate']; // Assignation de la valeur pour "creationDate"
    $document->user_id = $validatedData['user_id']; // Assignation de la valeur pour "creationDate"

  
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
    public function showD(documents $documents)
    {
        $documents = documents::all();

       // Convertir les données binaires en base64
       $documentsArray = $documents->map(function ($document) {
          $document->file = base64_encode($document->file);
           return $document;
       });

    //return response()->json(['documents' => $documentsArray]);
        return response(["documents"=>$documents]);

    }

    public function searchDocuments(Request $request)
    {
        // Validez les données de la requête
        $validatedData = $request->validate([
            'query' => 'required|string|max:255',
        ]);

        // Effectuez la recherche dans la base de données (exemple basique)
        $query = $validatedData['query'];
        $searchResults = documents::where('name', 'like', "%$query%")
            ->orWhere('categorie', 'like', "%$query%")
            ->orWhere('dateexpiration', 'like', "%$query%")
            ->get();

        return response()->json(['results' => $searchResults]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function editD(documents $documents)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateD(Request $request, $id) { // L'ID doit être un paramètre ici
        $document = documents::findOrFail($id);
        $document->update($request->all());
        return response()->json($document);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyD($id) // Changez la signature pour utiliser l'ID directement
    {
        $document = documents::find($id);

        if ($document) {
            $document->delete();
            return response()->json(['message' => 'Document deleted successfully']);
        } else {
            return response()->json(['message' => 'Document not found'], 404);
        }
    }

    
    public function mail(Request $request, $id) {
        $validatedData = $request->validate([
            'mail' => 'required|string|max:255',
        ]);
        
        $document = Documents::findOrFail($id);
        $filePath = storage_path('app/public/' . $document->file);
        
        if (!File::exists($filePath)) {
            abort(404);
        }
        
    
        
        // Si le type MIME n'est pas un PDF ou un DOCX, convertir une page du PDF en image
        $pdf = PDF::loadFile($filePath);
        $pdf->setPaper('A4', 'portrait'); // Définir le format de papier pour la conversion en image
        $imagePath = storage_path('app/public/preview.png'); // Chemin où sera enregistrée l'image
    
        // Convertir la première page du PDF en image
        $pdf->save($imagePath);
    
        // Envoyer l'e-mail avec l'image en pièce jointe
        $mailData = $validatedData['mail'];
    
        // Définir les données à envoyer dans le mail
        $data = [
            'document_name' => $document->name,
            'image_path' => $imagePath,
        ];
    
        Mail::send( $mailData, [], function($message) use ( $mailData,$data, $pdf) {
            $message->to( $mailData)
            ->subject('Sujet du mail')
            ->attach($pdf->output(), [
                'as' => 'document.pdf',
                'mime' => 'application/pdf',
            ]);
        });
    
        return response("OK");
    }
    
    

    public function downloadD($id)
    {
        $document = documents::findOrFail($id);
        $filePath = storage_path('app/public/' . $document->file);

        if (!file_exists($filePath)) {
            abort(404);
        }

        $headers = [
            'Content-Disposition' => 'attachment; filename="' . basename($filePath) . '"',
        ];

        return response()->download($filePath, basename($filePath), $headers);
    }


    public function previewD($id)
    {
        $document = documents::findOrFail($id);
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
