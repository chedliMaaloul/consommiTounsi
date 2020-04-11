import { Component, OnInit } from '@angular/core';
import {RecetteService} from '../../service/recette/recette.service';
import {ActionsLayout, Orientation} from '@progress/kendo-angular-layout';
import {Router} from '@angular/router';

@Component({
  selector: 'app-consulter-recette',
  templateUrl: './consulter-recette.component.html',
  styleUrls: ['./consulter-recette.component.css']
})
export class ConsulterRecetteComponent implements OnInit {
  list_recette=[];
  searchText : string;
  p=1;
  nbr_items=0;
  public expanded = false;
  public liked = false;
  public btnText = 'More';

  public actionsOrientation: Orientation = 'horizontal';
  public actionsLayout: ActionsLayout = 'end';
  constructor(private recette_service:RecetteService,private router: Router) { }

  ngOnInit() {

    this.get_recette();
  }
  public get horizontalStretched(): boolean {
    return this.actionsOrientation === 'horizontal' && this.actionsLayout === 'stretched';}
  public toggleRecipe(): void {
    this.expanded = !this.expanded;
    this.btnText = this.expanded ? 'Less' : 'More';
  }

  public updateRecette(id:any) {
  this.router.navigate(['/recette/add',id]);
    }

  public heartIcon(): string {
    return this.liked ? 'k-icon k-i-heart' : 'k-icon k-i-heart-outline';
  }
  get_recette()
  {
    this.recette_service.getRecettes().subscribe(
      (data:any[])=>{
        console.log(data)
        this.nbr_items = data.length;

        this.list_recette=data;
      }
    )
  }


}
