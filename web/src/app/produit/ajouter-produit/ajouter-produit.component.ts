import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProduitService} from '../../service/produit/produit.service';
import {CategorieService} from '../../service/categorie/categorie.service';
import {ActivatedRoute} from '@angular/router';
import * as $ from 'jquery';
import {Produits} from '../../entities/Produitd';
declare var toastr: any;

@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})

export class AjouterProduitComponent implements OnInit {
  f: FormGroup;
  code: string;
  nom: string;
  marque: string;
  prix: number;
  categorie: any;
  img: any;
  filedata: File;
  list_categories: any[];
  code_produit:any;
  produit:any;
  update:boolean=false;
  image_change:boolean=false;
  image:any;

  constructor(private form: FormBuilder, private produit_service: ProduitService, private categorie_service: CategorieService, private router: ActivatedRoute) {
    this.code_produit = this.router.snapshot.paramMap.get('id');
    console.log(this.code_produit);

    this.f = this.form.group({
      code: ['', [Validators.required, Validators.pattern('[0-9]{13}')]],
      nom: ['', Validators.required],
      marque: ['', Validators.required],
      prix: ['', Validators.required],
      img: ['', Validators.required],
      categorie: ['', Validators.required],
    });
  }

  ngOnInit() {

    toastr.options = {
      'closeButton': true,
      'debug': false,
      'newestOnTop': false,
      'progressBar': true,
      'positionClass': 'toast-top-right',
      'preventDuplicates': true,
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '2000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    };
    this.get_categories();
    if (this.code_produit) {
      $('#title').text('Modifier Produit');
      $('#btn').text('Modifier ');
      this.get_produit();
    }
  }
  get_produit() {
    this.produit_service.getProduit(this.code_produit).subscribe(
      (data:Produits) => {
        this.produit = data;
      console.log(data)


        this.update = true;
        this.f = this.form.group({
          code: [data.code, [Validators.required, Validators.pattern('[0-9]{13}')]],
          nom: [data.nom, Validators.required],
          marque: [data.marque, Validators.required],
          prix: [data.prix, Validators.required],
          img: '',
          categorie: [data.categorie, Validators.required],
        });
        this.categorie=data.categorie.nom;
        // this.f=this.form.group(this.recette);
        // this.f.get('img').setValue(data.img);
        this.image = data.img;


      },
      error2 => {
        console.log(error2);
      }

    );
  }
  fileEvent(e) {
    this.filedata = e.target.files[0];
    this.image_change = true;

  }
  get form_control() {

    return this.f.controls;
  }

  onSubmit() {
   if (this.f.valid) {
     if (this.update) {
       if (this.image_change) {
         console.log('image change')
         const uploadImageData = new FormData();
         uploadImageData.append('imageFile', this.filedata, this.filedata.name);
         this.produit_service.upload(uploadImageData).subscribe(image => {
             this.produit_service.update_produit_image_change(this.f.getRawValue(), image).subscribe(() => {
                 toastr['success']('Produit mise a jour avec succés ');


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
         this.produit_service.update_produit(this.f.getRawValue(), this.image).subscribe(
           data => {
             toastr['success']('Produit mise a jour avec succés ');

           }
           ,
           err => {
             toastr['error']('une erreur s\'est produite ');

           }
         );
       }


     } else {
       let uploadImageData = new FormData();
       uploadImageData.append('imageFile', this.filedata, this.filedata.name);
       console.log(this.f.get('categorie').value);
       this.produit_service.upload(uploadImageData).subscribe(image => {
           this.produit_service.add_produit(this.f.getRawValue(), image).subscribe(() => {
               toastr['success']('Produit ajoutée avec succés ');
                this.f.reset();

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
   }else {
      toastr['error']('veuillez  remplire les champs');
    }






  }

  get_categories() {
    this.categorie_service.getCategories().subscribe(
      (data: any[]) => {
        this.list_categories = data;
        console.log(this.list_categories);

  }
    );
  }

}
