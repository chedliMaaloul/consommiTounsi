import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProduitsPageRoutingModule } from './list-produits-routing.module';

import { ListProduitsPage } from './list-produits.page';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { Produit_filterPipe } from './Produit_filterPipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxPaginationModule,
    ListProduitsPageRoutingModule
  ],
  declarations: [ListProduitsPage,Produit_filterPipe]
})
export class ListProduitsPageModule {}
