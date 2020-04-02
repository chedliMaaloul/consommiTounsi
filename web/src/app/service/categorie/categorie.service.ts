import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  url = 'http://localhost:8188/';

  constructor(private http: HttpClient) { }

  AddCategories(body) {
    return this.http.post(this.url + 'api/categories/addcategorie', body);
  }
  getCategories() {
    return this.http.get(this.url + 'api/categories/getcategories');
  }

  update_categorie(body) {
    return this.http.put(this.url + 'api/categories/updatecategorie/', {
      id: body.id,
      nom: body.nom,

    });

  }

  delete_categorie(id) {
    return this.http.delete(this.url + 'api/categories/deletecategorie/'+ id);

  }
}
