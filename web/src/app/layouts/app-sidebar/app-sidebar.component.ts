import { Component } from '@angular/core';
import {ProduitService} from '../../service/produit/produit.service';
import {Router} from '@angular/router';

@Component({
  selector: '[app-sidebar]',
  templateUrl: './app-sidebar.component.html'
})
export class AppSidebar {
  constructor(private router:Router) { }

  ngOnInit() {}


  logOut()
  {
    localStorage.removeItem('remember');
    this.router.navigate(['login']);
  }
}
