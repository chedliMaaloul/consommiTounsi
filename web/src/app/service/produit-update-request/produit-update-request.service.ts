import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProduitUpdateRequest} from '../../entities/ProduitUpdateRequest';
import {Observable, ObservableInput} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class ProduitUpdateRequestService {
  url = 'http://localhost:8188/';

  constructor(private http: HttpClient) { }

  getProduits_requests() {
    return this.http.get(this.url + 'api/produit_request/get_requests');
  }

  getProduits_request(id) {
    return this.http.get(this.url + 'api/produit_request/get_request/'+id);
  }

  update_request(body)
  {
    console.log(body);
    return this.http.put(this.url+"api/produit_request/update_request/",{
      id:body.id,
      code:body.code,
      nom:body.nom,
      marque:body.marque,
      prix:body.prix,
      img:body.img,
      categorie:body.categorie,
      date:body.date,
      champ:body.champ,
      etat:body.etat
    });

  }
}
