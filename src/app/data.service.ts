import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private products = new BehaviorSubject<any>(['Product 1', 'Product 2']);
  product = this.products.asObservable();

  constructor() { }

  changeProduct(product){
    this.products.next(product);
  }
}
