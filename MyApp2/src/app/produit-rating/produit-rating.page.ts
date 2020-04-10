import { Component, OnInit } from '@angular/core';
import { Produits } from '../entities/Produits';
import { PopoverController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { NoteProduitService } from '../service/note-produit.service';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-produit-rating',
  templateUrl: './produit-rating.page.html',
  styleUrls: ['./produit-rating.page.scss'],
})
export class ProduitRatingPage implements OnInit {

  rate:any=0;
  produit:Produits
    constructor(public popover:PopoverController,
      public navParams: NavParams,
      public noteProduitProvider:NoteProduitService,
      public alertCtrl:AlertController ,
      public toastCtrl: ToastController,
      ) { 
      this.produit=this.navParams.data.data;
      console.log(this.produit);
      
    }
  
    ngOnInit() {}
    async toast() {
      let toast = await this.toastCtrl.create({
        message: this.produit.code,
        duration: 30000,
        position: "top",
      });
      toast.present();
    }
  async alerterror(error)
  {
    let alert = await this.alertCtrl.create({
      header:"" ,
      subHeader: error.error.message,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    this.rate=$event.newValue;
    console.log(this.rate)
  }
  
  add_note()
    {
      console.log(this.rate);
      if(this.rate>0)
      {
        this.noteProduitProvider.add_note_produit(this.rate,this.produit).subscribe(
          data =>{
            this.popover.dismiss();
  
  
          },
          error => {
            console.log(error.message)
            this.alerterror(error);
  
          }
        )
      }
  
  
    }
  close()
  {
    this.popover.dismiss();
  }
  }
  


