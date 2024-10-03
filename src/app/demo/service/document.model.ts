export interface Document {
    id?: number;
    titre: string;
    description?: string;
    type?: string;
    fichier?: File; // Optional property for the document file
    dateAjout?: Date;
    expediteur?: string;
    // You can add other properties as needed
  }
