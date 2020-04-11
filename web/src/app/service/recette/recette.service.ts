import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  url = 'http://localhost:8188/';
  constructor(private http: HttpClient) { }

  add_recette(body, image) {
    return this.http.post(this.url + 'api/recette/addrecette', {

      nom: body.nom,
      description: body.description,
      produits: body.produits,
      img: image.picByte,
    });

  }
  getRecette(id)
  {
    return this.http.get(this.url+"api/recette/find_recette_by_id/"+id);
  }
  getRecettes()
  {
    return this.http.get(this.url+"api/recette/findallrecettes/");
  }

  update_recette(body,image,id)
  {
    console.log(body);
    return this.http.put(this.url+"api/recette/updaterecette/",{
      id:body.id,
      nom:body.nom,
      description:body.description,
      produits:body.produits,
      img:image,

    });

  }

  update_recette_image_change(body,image,id)
  {
    console.log(body);
    return this.http.put(this.url+"api/recette/updaterecette/",{
      id:body.id,
      nom:body.nom,
      description:body.description,
      produits:body.produits,
      img:image.picByte,
    });

  }
}
