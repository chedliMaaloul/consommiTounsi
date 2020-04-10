import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitRatingPage } from './produit-rating.page';

const routes: Routes = [
  {
    path: '',
    component: ProduitRatingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduitRatingPageRoutingModule {}
