import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './/app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LayoutModule } from './/layouts/layout.module';
import { ScriptLoaderService } from './_services/script-loader.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProduitComponent } from './produit/produit.component';
import { AjouterProduitComponent } from './produit/ajouter-produit/ajouter-produit.component';
import { ConsulterProduitComponent } from './produit/consulter-produit/consulter-produit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProduitService } from './service/produit/produit.service';
import { Produit_filterPipe } from './produit/ajouter-produit/Produit_filterPipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AjouterCategoriesComponent } from './categories/ajouter-categories/ajouter-categories.component';
import { CategorieService } from './service/categorie/categorie.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AjouterRecetteComponent } from './recettes/ajouter-recette/ajouter-recette.component';
import { ConsulterRecetteComponent } from './recettes/consulter-recette/consulter-recette.component';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import { LoginComponent } from './login/login.component';
import {ProduitUpdateRequestService} from './service/produit-update-request/produit-update-request.service';
import {AppHeader} from './layouts/app-header/app-header.component';
import { ProduitUpdateRequestComponent } from './produit-update-request/produit-update-request.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProduitComponent,
    AjouterProduitComponent,
    ConsulterProduitComponent,
    Produit_filterPipe,
    AjouterCategoriesComponent,
    AjouterRecetteComponent,
    ConsulterRecetteComponent,
    LoginComponent,
    ProduitUpdateRequestComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule, Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    LayoutModule,
    AngularMultiSelectModule

  ],
  providers: [ScriptLoaderService, ProduitService, CategorieService, ProduitUpdateRequestService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {
}
