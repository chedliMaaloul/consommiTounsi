import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules} from '@angular/router';
import { CustomFormsModule } from 'ng4-validators';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LayoutComponent } from './/layouts/layout.component';


import {AjouterProduitComponent} from './produit/ajouter-produit/ajouter-produit.component';
import {ConsulterProduitComponent} from './produit/consulter-produit/consulter-produit.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AjouterCategoriesComponent} from './categories/ajouter-categories/ajouter-categories.component';
import {AjouterRecetteComponent} from './recettes/ajouter-recette/ajouter-recette.component';
import {ConsulterRecetteComponent} from './recettes/consulter-recette/consulter-recette.component';
import {LoginComponent} from './login/login.component';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {ProduitUpdateRequestComponent} from './produit-update-request/produit-update-request.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {
    'path': '',
    'component': LayoutComponent,
    'children': [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'produit/add',
        component: AjouterProduitComponent
      },
      { path: 'produit/add/:id',
        component: AjouterProduitComponent
      },
      {
        path: 'produit/show',
        component: ConsulterProduitComponent
      },
      {
        path: 'categorie/add',
        component: AjouterCategoriesComponent
      },

      {
        path: 'recette/add',
        component: AjouterRecetteComponent
      },
      { path: 'recette/add/:id',
        component: AjouterRecetteComponent
      },

      {
        path: 'recette/show',
        component: ConsulterRecetteComponent
      },
      {
        path: 'produit_request/show',
        component: ProduitUpdateRequestComponent
      },
      { path: 'produit_request/show/:id',
        component: ProduitUpdateRequestComponent
      },
    ]
  },
  {
    'path': 'login',
    'component': LoginComponent
  },

];

@NgModule({
  declarations: [

  ],
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}), FormsModule, CustomFormsModule, ReactiveFormsModule  ],
  exports: [
    RouterModule,
  ]

})

export class AppRoutingModule { }
