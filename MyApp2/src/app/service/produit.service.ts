import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: "root",
})
export class ProduitService {
  url = "http://192.168.1.2:8188/";
  constructor(public http: HttpClient) {}

  add_produit(body) {
    return this.http.post(this.url + "api/produit/addproduit", {
      code: body.code,
      nom: body.nom,
      marque: body.marque,
      prix: body.prix,
      img: body.img,
      categorie: body.categorie,
    });
  }
  getProduit(code) {
    return this.http.get(this.url + "api/produit/find_produit_by_id/" + code);
  }
  getProduits() {
    return this.http.get(this.url + "api/produit/findallproduit");
  }
}
