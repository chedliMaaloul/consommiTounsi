import { Component, OnInit } from '@angular/core';
import {ProduitService} from '../../service/produit/produit.service';
import {Route, Router} from '@angular/router';
import {Produits} from '../../entities/Produitd';
import Swal from 'sweetalert2'
declare var toastr: any;

@Component({
  selector: 'app-consulter-produit',
  templateUrl: './consulter-produit.component.html',
  styleUrls: ['./consulter-produit.component.css']
})

export class ConsulterProduitComponent implements OnInit {
  list_produits: any[];
  searchText : string;
  p=1;
  nbr_items=0;


  constructor( private produit_service:ProduitService ,private router:Router) { }

  ngOnInit() {
    this.get_produits();

  }
  public updateProduit(code:any) {
    this.router.navigate(['/produit/add',code]);
  }
get_produits()
{
  this.produit_service.getProduits().subscribe(
    (data:any[])=>{
      console.log(data)
      this.nbr_items = data.length;

      this.list_produits=data;
    }
  )
}
deleteProduit(produit:Produits)
{
  Swal.fire({
    title: 'Vous êtes sûre?',
    text: '',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Annuler',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, Supprimer le!'
  }).then((result) => {
    if (result.value) {
      this.produit_service.deleteProduit(produit.code).subscribe(
        data=>{
          Swal.fire(
            'Deleted!',
            'Produit supprimée avec succés',
            'success'
          );
          this.get_produits();

        }
        ,
        error => {
          toastr['error']('une erreur s\'est produite ');
          console.log(error)
        }
      )

    }
  })
}
}
