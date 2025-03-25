export interface _Admission {
    id: string;
    date: string;
    heure: string;
    type: string;
    justification: string;
    status: string;
    insurance: string;
    commentaires: string;
    patientid: string;
}

export interface _Chambre {
    nombre: string;
    capacite: number;
    surface: number;
    etage: number;
    description: string;
    equipements: string;
    unite_code: string;
}

export interface _Medecin {
    hasld: string;
    status: string;
    contrat: string;
    licence_medicale: string;
    specialite: string;
    hopital_id: string;
}

export interface _Patient {
    patientid: string;
    dni: string;
}

export interface _Personne {
    dni: string;
    prenom: string;
    nom: string;
    age: number;
    date_naissance: string;
}

export interface _Unite {
    code: string;
    nom: string;
    responsable: string;
    specialite: string;
    capacite: number;
    batiment: string;
    localization: string;
    equipements: string;
}

export interface _Hopital {
    id: string;
    nom: string;
    adresse: string;
    telephone: string;
    ville: string;
    email: string;
    directeur: string;
}
