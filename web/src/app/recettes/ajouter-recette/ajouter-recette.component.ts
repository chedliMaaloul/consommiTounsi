import { Component, OnInit } from '@angular/core';
import {ProduitService} from '../../service/produit/produit.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecetteService} from '../../service/recette/recette.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';
import {from} from 'rxjs/index';
import {Recettes} from '../../entities/Recettes';
declare var toastr: any;

@Component({
  selector: 'app-ajouter-recette',
  templateUrl: './ajouter-recette.component.html',
  styleUrls: ['./ajouter-recette.component.css']
})
export class AjouterRecetteComponent implements OnInit {
  id: any;
  f: FormGroup;
  nom: string;
  description: string;
  img: any;
  produits: any[];
  filedata: File;
  list_produits = [];
  settings = {};
  selectedItems = [];
  dropdownList = [];
  produits_selected = true;
  update = false;
  recette: any;
  image: any;
  image_change = false;

  constructor(private form: FormBuilder, private produit_service: ProduitService, private recette_service: RecetteService, private router: ActivatedRoute) {
    this.id = this.router.snapshot.paramMap.get('id');
    console.log(this.id);
    this.f = this.form.group({
      nom: ['', Validators.required],
      produits: [[], Validators.required],
      img: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {

    this.get_produits();
    this.settings = {
      singleSelection: false,
      text: 'Produits',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      searchPlaceholderText: 'Search Fields',
      enableSearchFilter: true,
      badgeShowLimit: 3,
      showCheckbox: true,

      // groupBy: 'nom'
    };
    if (this.id) {
      $('#title').text('Modifier Recette');
      $('#btn').text('Modifier ');
    this.get_recette();
    }

  }
  fileEvent(e) {

    this.filedata = e.target.files[0];
    this.image_change = true;

  }
  get form_control() {

    return this.f.controls;
  }

  get_recette() {
    this.recette_service.getRecette(this.id).subscribe(
      (data:Recettes) => {
        this.recette = data;

        for (let i = 0 ; i < data.produits.length; i++) {
          this.selectedItems.push({'id': data.produits[i].code, 'nom': data.produits[i].nom, 'marque': data.produits[i].marque, 'prix': data.produits[i].prix, 'img': data.produits[i].img, 'categorie': data.produits[i].categorie});
        }
        this.update = true;
        this.f = this.form.group({
          nom: [data.nom, Validators.required],
          produits: [this.selectedItems, Validators.required],
          img: '',
          description: [data.description, Validators.required]
        });
        // this.f=this.form.group(this.recette);
        // this.f.get('img').setValue(data.img);
        this.image = data.img;


      }
    );
  }
  get_produits() {
    this.produit_service.getProduits().subscribe(
      (data: any[]) => {
        for (let i = 0 ; i < data.length; i++) {
          this.list_produits.push({'id': data[i].code, 'nom': data[i].nom, 'marque': data[i].marque, 'prix': data[i].prix, 'img': data[i].img, 'categorie': data[i].categorie});
        }
        // this.list_produits=data;
      }
    );
  }

  onItemSelect(item: any) {
    this.f.get('produits').setValue(this.selectedItems);
    // console.log(this.f.get('produits').value);


    // console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {

    this.f.get('produits').setValue(this.selectedItems);
    // console.log(this.f.get('produits').value);

    // console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    this.selectedItems = items;
    this.f.get('produits').setValue(items);
    // console.log(this.f.get('produits').value);
    // console.log(items);


  }
  onDeSelectAll(items: any) {
    this.selectedItems = items;

    this.f.get('produits').setValue(items);
    this.produits_selected = false;

    // console.log(this.f.get('produits').value);

    // console.log(items);
  }
  onClose(item: any) {
    this.produits_selected = this.selectedItems.length != 0;
    console.log(item);
    console.log(this.produits_selected);
  }

  onSubmit() {
    const x = this.f.get('produits').value;
    const prod_list = [];
    for (let i = 0 ; i < x.length; i++) {
      prod_list.push({'code': x[i].id, 'nom': x[i].nom, 'marque': x[i].marque, 'prix': x[i].prix, 'img': x[i].img, 'categorie': x[i].categorie});
    }
    this.f.get('produits').setValue(prod_list);
    if (this.f.valid) {
      if (this.update) {
        if (this.image_change) {
          const uploadImageData = new FormData();
          uploadImageData.append('imageFile', this.filedata, this.filedata.name);
          this.produit_service.upload(uploadImageData).subscribe(image => {
              this.recette_service.update_recette_image_change(this.f.getRawValue(), image, this.id).subscribe(() => {
                  toastr['success']('Recette mise a jour avec succées ');


                }
                ,
                err => {
                  toastr['error']('une erreur s\'est produite ');

                }
              );
            },
            err => {
              toastr['error']('une erreur s\'est produite ');

            });
        } else {
          console.log(this.f.getRawValue());
          this.recette_service.update_recette(this.f.getRawValue(), this.image, this.id).subscribe(
            data => {
              toastr['success']('Recette mise a jour avec succées ');

            }
            ,
            err => {
              toastr['error']('une erreur s\'est produite ');

            }
          );
        }


      } else {
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile', this.filedata, this.filedata.name);
        this.produit_service.upload(uploadImageData).subscribe(image => {
            this.recette_service.add_recette(this.f.getRawValue(), image).subscribe(() => {
                toastr['success']('Recette ajouter avec succées ');


              }
              ,
              err => {
                toastr['error']('une erreur s\'est produite ');

              }
            );
          },
          err => {
            toastr['error']('une erreur s\'est produite ');

          });
      }


    } else {
      toastr['error']('veuillez  remplire les champs');
    }





  }

}
