import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../service/produit.service';
import { NoteProduitService } from '../service/note-produit.service';
import { Produits } from '../entities/Produits';
import { Route } from '@angular/compiler/src/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list-produits',
  templateUrl: './list-produits.page.html',
  styleUrls: ['./list-produits.page.scss'],
})
export class ListProduitsPage implements OnInit {
  list_produits: any[]=[];
  list_note:any[]=[];
  searchText : string;
  p=1;
  nbr_items=0;
  constructor(private produitservice:ProduitService,private note_produit_service:NoteProduitService,private router:Router) { }

  ngOnInit() {
    this.get_produits();

  }

  goToHome()
  {
    this.router.navigate(["/home"]);
  }
  doRefresh(refresher) {

    setTimeout(() => {
      this.get_produits();      
      refresher.target.complete();
    }, 1000);
  }
 
  get_produits()
  {
    this.produitservice.getProduits().subscribe(
      (data:Produits[])=>{
        console.log(data)
        this.nbr_items = data.length;

        this.list_produits=data;
        for (let x=0; x< this.list_produits.length;x++)
        {
          this.note_produit_service.get_note_produit(this.list_produits[x].code).subscribe(
            (res)=>{

              let y = this.list_produits[x];
              if(res>0)
                this.list_produits[x].note=res;

              else this.list_produits[x].note=0

              //this.list_produits.push(y)



            }

        )
          //this.list_produits=l;


        }
        console.log(this.list_produits)



          }
    )
  }
  viewDetail(produit)
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(produit)
      }
    }
    this.router.navigate(["detail-produit"], navigationExtras);

  }
}
