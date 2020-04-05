import {Categories} from './Categories';

export class ProduitUpdateRequest {
  code: string;
  nom: string;
  marque: string;
  img: string;
  prix: number;
  categorie:Categories
  date: string;
  champ: string;
  etat: string;
}
