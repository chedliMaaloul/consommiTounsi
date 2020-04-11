import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {ProduitUpdateRequestService} from '../service/produit-update-request/produit-update-request.service';
import {ProduitService} from '../service/produit/produit.service';
import {Produits} from '../entities/Produitd';
import {ProduitUpdateRequest} from '../entities/ProduitUpdateRequest';
import {filter} from 'rxjs/internal/operators';
declare var toastr: any;

@Component({
  selector: 'app-produit-update-request',
  templateUrl: './produit-update-request.component.html',
  styleUrls: ['./produit-update-request.component.css']
})
export class ProduitUpdateRequestComponent implements OnInit {
  list_request: any[];
  id: any;
  data: any;
  produit: any;
  constructor( private produit_update_request_service: ProduitUpdateRequestService, private router: ActivatedRoute,
               private produitService: ProduitService, private ProduitUpdateRequestService: ProduitUpdateRequestService,
                private route: Router) {



  }

  ngOnInit() {
    this.route.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.get_all_reques();  });
    this.router.params.subscribe(routeParams => {
      this.id = routeParams.id;
      if (this.id) {
        console.log(this.id);
        this.get_request();
      }
    });
    this.id = this.router.snapshot.paramMap.get('id');
    /*if (this.id) {
      console.log(this.id);
      this.get_request();
    }*/

    this.get_all_reques();
    toastr.options = {
      'closeButton': true,
      'debug': false,
      'newestOnTop': false,
      'progressBar': true,
      'positionClass': 'toast-top-right',
      'preventDuplicates': true,
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '2000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    };
  }
  get_request() {

    this.produit_update_request_service.getProduits_request(this.id).subscribe(
      (data: any) => {
        this.data = data;
        console.log(this.data);
        if (data) {
        this.produitService.getProduit(this.data.code).subscribe(
          (data2: Produits) => {
            this.produit = data2;
            console.log(this.produit);
          }
        );
        }
      }
    );
  }
  get_all_reques() {

    this.produit_update_request_service.getProduits_requests().subscribe(
      (data: any[]) => {
        this.list_request = data;
      }
    );
  }

  refuser_request(data) {
    let prod: ProduitUpdateRequest;
    prod = Object.assign({}, data) ;
    prod.etat = 'refuser';
    this.produit_update_request_service.update_request(prod).subscribe(
      data => {
        this.route.navigate(['/produit_request/show']);
        this.get_all_reques();

      },
      error2 => {
        toastr['error']('une erreur s\'est produite ');

      }
    );


  }
  accepter_request(data) {
    let prod: ProduitUpdateRequest;
    prod = Object.assign({}, data) ;
    prod.etat = 'accepter';
    this.produit_update_request_service.update_request(prod).subscribe(
      data => {
        this.produitService.update_produit(prod, prod.img).subscribe(
          (data) => {
            toastr['success']('Produit mise a jour avec succés ');
            setTimeout (() => {
              this.route.navigate(['/produit/show']);
            }, 2000);


          },
          error => {
            toastr['error']('une erreur s\'est produite ');

          }

        );

      },
      error2 => {
        toastr['error']('une erreur s\'est produite ');

      }
    );


  }
}
