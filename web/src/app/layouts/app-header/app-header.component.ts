import {Component, AfterViewInit, OnInit, OnDestroy} from '@angular/core';
import {ProduitUpdateRequestService} from '../../service/produit-update-request/produit-update-request.service';
import {ProduitUpdateRequest} from '../../entities/ProduitUpdateRequest';

import { interval } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: '[app-header]',
  templateUrl: './app-header.component.html',
})
export class AppHeader implements  OnInit, OnDestroy {


  source: any;
  subscribe: any;
  list_request: any[];
request_count: any=0;
  constructor( private produit_update_request_service: ProduitUpdateRequestService,private router:Router) { }
  ngOnInit() {
    this.source = interval(3000);
     this.subscribe = this.source.subscribe(val => this.get_all_reques());
    // this.get_all_reques();


  }

get_all_reques() {

  this.produit_update_request_service.getProduits_requests().subscribe(
    (data: any[]) => {
    this.list_request = data;
    this.request_count = this.list_request.length;
  }
  );
}
  showRequest(id) {
    this.router.navigate(['/produit_request/show',id]);

  }
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
