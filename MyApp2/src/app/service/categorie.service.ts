import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CategorieService {
  url = "http://192.168.1.2:8188/";
  constructor(public http: HttpClient) {}

  getCategories() {
    return this.http.get(this.url + "api/categories/getcategories");
  }
}
