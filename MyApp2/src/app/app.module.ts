import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicRatingModule } from 'ionic-rating';
import { RatingModule } from 'ng-starrating';
import { ProduitService } from './service/produit.service';
import { NoteProduitService } from './service/note-produit.service';
import { ProduitUpdateRequestService } from './service/produit-update-request.service';
import { CategorieService } from './service/categorie.service';
import { Camera } from "@ionic-native/camera/ngx";
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HttpClientModule } from '@angular/common/http';
import { ProduitRatingPage } from './produit-rating/produit-rating.page';
@NgModule({
  declarations: [AppComponent,ProduitRatingPage],
  entryComponents: [ProduitRatingPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicRatingModule,RatingModule,HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ProduitService,
    NoteProduitService,
    ProduitUpdateRequestService,
    CategorieService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
