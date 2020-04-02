import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategorieService} from '../../service/categorie/categorie.service';
import {date} from 'ng4-validators/src/app/date/validator';
import {Categories} from '../../entities/Categories';
import * as $ from 'jquery';
declare var toastr: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-categories',
  templateUrl: './ajouter-categories.component.html',
  styleUrls: ['./ajouter-categories.component.css']
})
export class AjouterCategoriesComponent implements OnInit {
  f: FormGroup;
  nom: string;
  list_categorie: any[];
  update = false;
  categorie: any;

  constructor(private form: FormBuilder, private categorieService: CategorieService) {
    this.f = this.form.group({
      nom: ['', Validators.required],

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
    this.getcategories();
  }
  getcategories() {
    this.categorieService.getCategories().subscribe(
      (data: Categories[]) => {
        this.list_categorie = data;

    });
  }
  get form_control() {

    return this.f.controls;
  }
  onSubmit() {
    if (this.f.valid) {
      if (!this.update) {
        this.categorieService.AddCategories(this.f.getRawValue()).subscribe(() => {
            toastr['success']('Categorie Ajoutée avec succés ');
            this.f.reset();

            this.getcategories();
          },
          error => {
            toastr['error']('une erreur s\'est produite ');
          }
        );
      } else {
        this.categorie.nom = this.f.get('nom').value;
        this.categorieService.update_categorie(this.categorie).subscribe(() => {
            $('#title').text('Ajouter Categorie ');

            $('#btn').text('Ajouter ');
            this.getcategories();
            this.update=false;
            this.f.reset();
            toastr['success']('Categorie mise a jour avec succés ');
          },
          error => {
            toastr['error']('une erreur s\'est produite ');
          }
        );
      }
    }
    else {
      toastr['error']('veuillez  remplire les champs');
    }
  }
update_categorie(cat: Categories) {
  this.categorie = cat;
  this.update = true;
  $('#title').text('Modifier Categorie ');

  $('#btn').text('Modifier ');

  this.f.get('nom').setValue(cat.nom);
}


  delete_categorie(cat: Categories) {

    Swal.fire({
      title: 'Vous êtes sûre?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer le!'
    }).then((result) => {
      if (result.value) {
        this.categorieService.delete_categorie(cat.id).subscribe(
          data => {
            Swal.fire(
              'Deleted!',
              'Categorie supprimée avec succés',
              'success'
            );
            $('#title').text('Ajouter Categorie ');

            $('#btn').text('Ajouter ');
            this.update=false;
            this.getcategories();

          }
          ,
          error => {
            toastr['error']('une erreur s\'est produite ');
            console.log(error);
          }
        );

      }
    });

  }
}
