import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduitRatingPageRoutingModule } from './produit-rating-routing.module';

import { ProduitRatingPage } from './produit-rating.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduitRatingPageRoutingModule
  ],
  declarations: [ProduitRatingPage]
})
export class ProduitRatingPageModule {}
