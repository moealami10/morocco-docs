export type NatureContrat = string;
export type TypeAutorisation = string;
export type QualiteParent = string;

export interface AttestationData {
  nomEntreprise: string
  adresseEntreprise: string
  iceEntreprise: string
  nomSignataire: string
  qualiteSignataire: string
  nomEmploye: string
  cinEmploye: string
  noCnss: string
  posteOccupe: string
  natureContrat: NatureContrat
  inclureSalaire: boolean
  salaireBrut: string
  dateDebut: string
  toujoursEnPoste: boolean
  dateFin: string
  lieuEmission: string
  dateEmission: string
}

export interface AutorisationData {
  typeAutorisation: TypeAutorisation
  nomParent: string
  qualite: QualiteParent
  cinParent: string
  adresseParent: string
  telephoneParent: string
  nomEnfant: string
  dateNaissanceEnfant: string
  cinEnfant: string
  destination: string
  datesSejour: string
  accompagnePar: string
  motif: string
  lieuEmission: string
  dateEmission: string
}