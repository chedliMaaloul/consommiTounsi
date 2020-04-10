import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProduitUpdateRequestService {
  url = "http://192.168.1.2:8188/";
  constructor(public http: HttpClient) {}

  add_request(body) {
    return this.http.post(this.url + "api/produit_request/add_request", {
      code: body.code,
      nom: body.nom,
      marque: body.marque,
      prix: body.prix,
      img: body.img,
      categorie: body.categorie,
      date: body.date,
      champ: body.champ,
      etat: "en attente",
    });
  }
  add_request_with_image(body, image) {
    return this.http.post(this.url + "api/produit_request/add_request", {
      code: body.code,
      nom: body.nom,
      marque: body.marque,
      prix: body.prix,
      img: image.picByte,
      categorie: body.categorie,
      date: body.date,
      champ: body.champ,
      etat: "en attente",
    });
  }
}
