import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produits } from '../entities/Produits';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.page.html',
  styleUrls: ['./detail-produit.page.scss'],
})
export class DetailProduitPage implements OnInit {
produit:Produits;
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.data) 
        this.produit = JSON.parse(params.data);
        console.log(this.produit);
        
    });
  }
  goToHome()
  {
    this.router.navigate(["/home"]);
  }
}
