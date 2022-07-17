import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../classes/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class Resolver implements Resolve<Product> {

  public product: Product = {};

  constructor(
    private router: Router,
    public productService: ProductService
  ) { }

  // Resolver
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.productService.getProductById(route.params.slug)
    // .pipe(
    //   catchError(error => {
    //     return of('No data');
    //   }))
  }

  // resolve(route: ActivatedRouteSnapshot): Observable<any> {
  //   this.productService.getAllProducts().subscribe(products => {
  //     if (!products) { // When product is empty redirect 404
  //       this.router.navigateByUrl('/404', { skipLocationChange: true });
  //     } else {
  //       this.product = products.map(product => {
  //         if (product._id === route.params.slug) {
  //           return product
  //         }
  //       })[0]
  //     }
  //   })
  //   return this.product;
  // }
}
