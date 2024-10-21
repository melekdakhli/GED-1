<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rhs', function (Blueprint $table) {
            $table->id();
            $table->string('categorie');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('taille');
            $table->string('motcle');
            $table->string('name');
            $table->string('file'); // pour stocker le contenu binaire du document
            $table->string('creationDate')->nullable();  // Utilisez le type date et enlevez les espaces
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rhs');
    }
};
