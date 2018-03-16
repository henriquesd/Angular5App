import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('products', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1}),
          ]))]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),
          ]))]), { optional: true })

      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'Add an item';
  productText: string = '';
  products = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.product.subscribe(res => this.products = res);
    this.itemCount = this.products.length;
    this._data.changeProduct(this.products);
  }

  addItem(){
      this.products.push(this.productText);
      this.productText = '';
      this.itemCount = this.products.length;
      this._data.changeProduct(this.products);
  }

  removeItem(i){
    this.products.splice(i, 1);
    this._data.changeProduct(this.products);
    this.itemCount = this.products.length;
  }

}
