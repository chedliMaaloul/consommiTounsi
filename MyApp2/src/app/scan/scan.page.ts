import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ToastController, ActionSheetController, IonSelect, PopoverController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../service/produit.service';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Categories } from '../entities/Categories';
import { Produits } from '../entities/Produits';
import { ProduitUpdateRequest } from '../entities/ProduitUpdateRequest';
import { CategorieService } from '../service/categorie.service';
import { NoteProduitService } from '../service/note-produit.service';
import { ProduitUpdateRequestService } from '../service/produit-update-request.service';
import { ProduitRatingPage } from '../produit-rating/produit-rating.page';

@Component({
  selector: "app-scan",
  templateUrl: "./scan.page.html",
  styleUrls: ["./scan.page.scss"],
})
export class ScanPage implements OnInit {
  @ViewChild("select", { static: false }) select: IonSelect;
  hideList = true;

  data: any;
  note: any = 0;
  categories: any[];
  produits: any[];
  cat: any;
  isTunisie: Boolean;

  constructor(
    public alertController: AlertController,
    private route: ActivatedRoute,
    private router:Router,
    private produitService: ProduitService,
    private categoriesService: CategorieService,
    private noteProduitService: NoteProduitService,
    private produit_update_request_service: ProduitUpdateRequestService,
    private camera: Camera,
    private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private popoverCtrl:PopoverController
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
        console.log(this.data);
        if (this.data.code) {
          if (this.data.code.substr(0, 3) == "619") {
            this.isTunisie = true;
            this.get_produit_note(this.data);
            this.getCategorie();
          } else this.isTunisie = false;
        }
      }
    });
    /*this.route.params.subscribe((params) => {
      this.code = params["produit"];
      console.log(this.code)
      if (this.code.code) {
        if (this.code.code.substr(0, 3) == "619") {
          this.isTunisie = true;
          //this.getProduit();
        } else this.isTunisie = false;
      }
    });*/
  }

  ngOnInit() {}
  getLabelValue() {}
  doRefresh(refresher,data) {

    setTimeout(() => {
      this.produitService.getProduit(data.code).subscribe(
        (data:Produits)=>{
          this.data=data;
        }
      )
      refresher.target.complete();
    }, 1000);
    this.get_produit_note(data);
  }
  goToHome()
  {
    this.router.navigate(["/home"]);
  }
  //////////////////////////////////////
  getCategorie() {
    this.categoriesService.getCategories().subscribe((data: Categories[]) => {
      this.categories = data;
    });
  }
  ////////////////////////////////////////
  getProduit() {
    this.produitService
      .getProduit(this.data.code)
      .subscribe((data: Produits[]) => {
        this.produits = data;
      });
  }

  /////////////////////////////////////
  get_produit_note(data) {
    this.noteProduitService
      .get_note_produit(data.code)
      .subscribe((res: any) => {
        console.log(res);
        if (res > 0) this.note = res;
      });
  }

  ///////////////////////////////////
  async toastError(error) {
    let toast = await this.toastCtrl.create({
      message: error.message,
      duration: 30000,
      position: "top",
    });
    toast.present();
  }

  async toastConfiramtion() {
    let toast = await this.toastCtrl.create({
      message: "champ vide!!",
      duration: 3000,
      position: "top",
    });
    toast.present();
  }
  async showAlertConfirmation() {
    let all = await this.alertController.create({
      header: "update Categorie",
      message:
        "Votre demande de modifier la categorie du produit a été envoyer merci ",

      buttons: [
        {
          text: "OK",
          role: "cancel",
          handler: (data) => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    all.present();
  }
  async ShowAlert(champ) {
    const all = await this.alertController.create({
      header: "update " + champ,
      message:
        "Votre demande de modifier " +
        champ +
        "du produit a été envoyer merci ",
      buttons: [
        {
          text: "OK",
          role: "cancel",
          handler: (data) => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await all.present();
  }
  async update_image(produit) {
    let actionSheet = await this.actionSheetCtrl.create({
      header: "choose",
      cssClass: "action-sheets-basic-page",
      buttons: [
        {
          text: "Caméra",
          role: "destructive",
          icon: "camera",
          handler: () => {
            this.takePhoto(produit);
          },
        },
        {
          text: "Gallery",
          icon: "image",
          handler: () => {
            this.openGallery(produit);
          },
        },
      ],
    });
    await actionSheet.present();
  }

  takePhoto(produit) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:

        let myphoto = "data:image/jpeg;base64," + imageData;
        let prod: ProduitUpdateRequest;
        var d = new Date();
        d.setTime(
          d.getTime() +
          d.getTimezoneOffset() * 60 * 1000 /* convert to UTC */ +
            /* UTC+1 */ 1 * 60 * 60 * 1000
        );
        let date = d.toLocaleDateString("fr-FR") + " " + d.toLocaleTimeString();
        prod = Object.assign({}, produit);
        prod.img = imageData;
        prod.date = date;
        prod.champ = "Image";
        this.produit_update_request_service.add_request(prod).subscribe(
          (data) => {
            this.ShowAlert("image");
          },
          (error) => {
            this.toastError(error);
          }
        );
        // alert(myphoto)
        //this.data.img=imageData;
      },
      (err) => {
        // Handle error
      }
    );
  }

  openGallery(produit) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let myphoto = "data:image/jpeg;base64," + imageData;
        let prod: ProduitUpdateRequest;
        var d = new Date();
        d.setTime(
          d.getTime() +
          d.getTimezoneOffset() * 60 * 1000 /* convert to UTC */ +
            /* UTC+1 */ 1 * 60 * 60 * 1000
        );
        let date = d.toLocaleDateString("fr-FR") + " " + d.toLocaleTimeString();
        prod = Object.assign({}, produit);
        prod.img = imageData;
        prod.date = date;
        prod.champ = "Image";
        this.produit_update_request_service.add_request(prod).subscribe(
          (data) => {
            this.ShowAlert("image");
          },
          (error) => {
            this.toastError(error);
          }
        );
        // alert(myphoto)
        //this.data.img=imageData;
      },
      (err) => {
        // Handle error
      }
    );
  }

  /////////////////////////////////////////*******************
  async update_nom(produit) {
    let al = await this.alertController.create({
      header: "update Nom",
      inputs: [
        {
          name: "nom",
          placeholder: "Nom de produit",
          type: "text",
          value: produit.nom,
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (data) => {
            console.log("Cancel clicked");
          },
        },
        {
          text: "Confirmer",
          handler: (data) => {
            if (data.nom == "") {
              this.toastConfiramtion();
            } else {
              let prod: ProduitUpdateRequest;
              var d = new Date();
              d.setTime(
                d.getTime() +
                d.getTimezoneOffset() * 60 * 1000 /* convert to UTC */ +
                  /* UTC+1 */ 1 * 60 * 60 * 1000
              );
              let date =
                d.toLocaleDateString("fr-FR") + " " + d.toLocaleTimeString();
              prod = Object.assign({}, produit);
              prod.nom = data.nom;
              prod.date = date;
              prod.champ = "Nom";
              this.produit_update_request_service.add_request(prod).subscribe(
                (data) => {
                  this.ShowAlert("nom");
                },
                (error) => {
                  this.toastError(error);
                }
              );
            }
          },
        },
      ],
    });
    al.present();
  }

  /////////////////////////////////////////*******************
  async update_marque(produit) {
    let al = await this.alertController.create({
      header: "update Marque",
      inputs: [
        {
          name: "marque",
          placeholder: "Marque de produit",
          type: "text",
          value: produit.marque,
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (data) => {
            console.log("Cancel clicked");
          },
        },
        {
          text: "Confirmer",
          handler: (data) => {
            if (data.marque == "") {
              this.toastConfiramtion();
            } else {
              let prod: ProduitUpdateRequest;
              var d = new Date();
              d.setTime(
                d.getTime() +
                d.getTimezoneOffset() * 60 * 1000 /* convert to UTC */ +
                  /* UTC+1 */ 1 * 60 * 60 * 1000
              );
              let date =
                d.toLocaleDateString("fr-FR") + " " + d.toLocaleTimeString();
              prod = Object.assign({}, produit);
              prod.marque = data.marque;
              prod.date = date;
              prod.champ = "Marque";
              this.produit_update_request_service.add_request(prod).subscribe(
                (data) => {
                  this.ShowAlert("marque");
                },
                (error) => {
                  this.toastError(error);
                }
              );
            }
          },
        },
      ],
    });
    al.present();
  }
  ////////////////////////////////////////
  openSelect() {
    this.select.open();
  }
  update_categorie(produit) {
    if (this.cat == null) {
      this.toastConfiramtion();
    } else {
      let prod: ProduitUpdateRequest;
      var d = new Date();
      d.setTime(
        d.getTime() +
        d.getTimezoneOffset() * 60 * 1000 /* convert to UTC */ +
          /* UTC+1 */ 1 * 60 * 60 * 1000
      );
      let date = d.toLocaleDateString("fr-FR") + " " + d.toLocaleTimeString();
      prod = Object.assign({}, produit);
      prod.categorie = this.cat;
      prod.date = date;
      prod.champ = "Categorie";
      this.produit_update_request_service.add_request(prod).subscribe(
        (data) => {
          //this.select.close();
        },
        (error) => {
          this.toastError(error);
        }
      );
    }
  }

////////////////////////////////////////////////
async update_prix(produit) {
  let al = await this.alertController.create({
    header: "update Prix",
    inputs: [
      {
        name: "prix",
        placeholder: "Prix de produit",
        type: "text",
        value: produit.prix,
      },
    ],
    buttons: [
      {
        text: "Cancel",
        role: "cancel",
        handler: (data) => {
          console.log("Cancel clicked");
        },
      },
      {
        text: "Confirmer",
        handler: (data) => {
          if (data.prix == 0) {
            this.toastConfiramtion();
          } else {
            let prod: ProduitUpdateRequest;
            var d = new Date();
            d.setTime(
              d.getTime() +
              d.getTimezoneOffset() * 60 * 1000 /* convert to UTC */ +
                /* UTC+1 */ 1 * 60 * 60 * 1000
            );
            let date =
              d.toLocaleDateString("fr-FR") + " " + d.toLocaleTimeString();
            prod = Object.assign({}, produit);
            prod.prix = data.prix;
            prod.date = date;
            prod.champ = "Prix";
            this.produit_update_request_service.add_request(prod).subscribe(
              (data) => {
                this.ShowAlert("prix");
              },
              (error) => {
                this.toastError(error);
              }
            );
          }
        },
      },
    ],
  });
  al.present();
}

////////////////////////////////

async openRatingPage(ev:any,produit) {
  const modal = await this.popoverCtrl.create({
    component: ProduitRatingPage,
    componentProps: {
      "data": produit,
      
    }
  });

  modal.onDidDismiss().then((dataReturned) => {
    this.noteProduitService.get_note_produit(produit.code).subscribe(
      (res:any)=>{
        console.log(res);
        this.note=res;

      }
    )
  });

  return await modal.present();
}
}

