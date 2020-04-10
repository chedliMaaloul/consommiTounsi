import { Component } from '@angular/core';

import { Platform, ToastController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationExtras, Router } from '@angular/router';
import { BarcodeScanResult, BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ProduitService } from './service/produit.service';
import { Produits } from './entities/Produits';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  data: BarcodeScanResult;
  option: BarcodeScannerOptions;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public barcodeScanner: BarcodeScanner,
    public toastCtrl: ToastController,
    private menuctrl:MenuController,
    private router: Router,
    private produitservice:ProduitService

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async toastError(error) {
    let toast = await this.toastCtrl.create({
      message: error.message,
      duration: 30000,
      position: "top",
    });
    toast.present();
  }
  navigate()
  {
    let produit = {
      code: "6198686",
      nom: "",
      marque: "",
      prix: 0,
      img: null,
      categorie: null,
    };
     let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(produit)
      }
    }
    this.router.navigate(["scan"], navigationExtras);
  }
  goTo(page)
  {
    
    this.router.navigate([page])
    this.menuctrl.close();
  }

  scan() {
    this.menuctrl.close();
    this.option = {
      prompt: "pointer votre caméra vers un code à barre",
      torchOn: false,
      showTorchButton:true
    };
    this.barcodeScanner
      .scan(this.option)
      .then((barcodeData) => {
        if(barcodeData.cancelled)
        this.router.navigate(['/home']);
        else {
          // console.log('Barcode data', barcodeData);
          this.data = barcodeData;
          this.produitservice.getProduit(barcodeData.text).subscribe(
            (data: Produits) => {
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  special: JSON.stringify(data)
                }
              }
              this.router.navigate(["scan"], navigationExtras);
              
            }
            ,
            err => {
              if (barcodeData.text.substr(0, 3) == '619' && barcodeData.text.length == 13) {
                let produit = {
                  code: barcodeData.text,
                  nom: '',
                  marque: '',
                  prix: 0,
                  img: null,
                  categorie: null,
                }
                this.produitservice.add_produit(produit).subscribe(
                  data2 => {
                    this.produitservice.getProduit(barcodeData.text).subscribe(
                      (data3: Produits) => {
                        let navigationExtras: NavigationExtras = {
                          queryParams: {
                            special: JSON.stringify(data3)
                          }
                        }
                        this.router.navigate(["scan"], navigationExtras);
  
                      }
                    )
  
                  },
                  error2 => {
                    this.toastError(error2);
                  }
                )
              }
              else
              {
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    special: JSON.stringify({code:barcodeData.text})
                  }
                }
                this.router.navigate(["scan"], navigationExtras);
              }
            }
          )
  
        }
      })
      .catch((err) => {
        this.toastCtrl
          .create({
            message: err.message,
            duration: 2000,
            buttons: ["OK"],
          })
          .finally();
      });
    /*this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log("Scanned something", text);

            this.qrScanner.hide();
            scanSub.unsubscribe();
          });
        } else if (status.denied) {
        } else {
        }
      })
      .catch((e: any) => console.log("Error is", e));
  }*/
}
}
