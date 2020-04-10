import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class NoteProduitService {
  url = "http://192.168.1.2:8188/";
  constructor(public http: HttpClient) {}

  add_note_produit(note, produit) {
    return this.http.post(this.url + "api/note_produit/addnoteProduit", {
      note: note,
      produit: produit,
    });
  }

  get_note_produit(code) {
    return this.http.get(
      this.url + "api/note_produit/get_produit_note/" + code
    );
  }
}
