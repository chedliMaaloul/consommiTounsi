import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter_produit'
})

@Injectable()
export class Produit_filterPipe implements PipeTransform {
  transform(items: any[], value1: string){
    if (items && items.length){
      return items.filter(item => {
        if ((value1 && item.nom.toLowerCase().indexOf(value1.toLowerCase()) === -1) && (value1 && item.marque.toLowerCase().indexOf(value1.toLowerCase()) === -1) && (value1 && item.prix.toString().toLowerCase().indexOf(value1.toLowerCase()) === -1)){
          return false;
        }


        return true;
      });
    }
    else{
      return items;
    }
  }
}
