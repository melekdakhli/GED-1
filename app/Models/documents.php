<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class documents extends Model
{
    use HasFactory;
protected $fillable = ['name', 'categorie','user_id', 'creationDate', 'taille','motcle' , 'file'/*,'mime_type'*/];


}


   //protected $hidden = ['documents']; // Cela exclura le champ `documents` de la réponse JSON
