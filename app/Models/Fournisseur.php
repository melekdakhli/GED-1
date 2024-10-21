<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fournisseur extends Model
{
    use HasFactory;
protected $fillable = ['name', 'categorie','user_id', 'creationDate', 'taille','motcle' , 'file'/*,'mime_type'*/];
}
