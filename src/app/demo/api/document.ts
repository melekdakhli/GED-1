// Dans document.ts
export interface Document {
    id?: number;
    name?: string;
    taille?: string; // Ajout du champ "taille"
    motcle?: string; // Ajout du champ "mot_cle"
    categorie?: string;
    user_id?: string;
    creationDate?: Date; // Renommage de "created_at" en "creationDate"
    dateexpiration?: Date;
    updatedAt?: Date; // Renommage de "updated_at" en "updatedAt"
    file?: string;
}




