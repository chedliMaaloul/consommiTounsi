import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  url="http://localhost:8188/";
  constructor(private http:HttpClient) { }
  upload(photo)
  {
    return this.http.post(this.url+"api/produit/upload",photo);
  }
  add_produit(body,image)
  {
    return this.http.post(this.url+"api/produit/addproduit",{

      code:body.code,
      nom:body.nom,
      marque:body.marque,
      prix:body.prix,
      img:image.picByte,
      categorie:body.categorie
    });

  }
  getProduits()
  {
    return this.http.get(this.url+"api/produit/findallproduit");
  }

  getProduit(code)
  {
    return this.http.get(this.url+"api/produit/find_produit_by_id/"+code);
  }
  update_produit(body,image)
  {
    console.log(body);
    return this.http.put(this.url+"api/produit/updateproduit/",{
      code:body.code,
      nom:body.nom,
      marque:body.marque,
      prix:body.prix,
      img:image,
      categorie:body.categorie
    });

  }

  update_produit_image_change(body,image)
  {
    console.log(body);
    return this.http.put(this.url+"api/produit/updateproduit/",{
      code:body.code,
      nom:body.nom,
      marque:body.marque,
      prix:body.prix,
      img:image.picByte,
      categorie:body.categorie
    });

  }

  deleteProduit(code)
  {
    return this.http.delete(this.url+"api/produit/deleteproduit/"+code);
  }
}
