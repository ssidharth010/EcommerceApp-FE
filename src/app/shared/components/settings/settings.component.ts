import { Component, OnInit, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductService } from "../../services/product.service";
import { Product } from "../../classes/product";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public products: Product[] = [];
  public search: boolean = false;
  searchInput: string;
  loggedIn: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    public productService: ProductService, private router: Router, private authService: AuthService) {
    const currentUser = this.authService.currentUserValue;
    this.loggedIn = currentUser && currentUser.token;
    this.productService.cartItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
    if(this.loggedIn){
      this.productService.getCart().subscribe(res => console.log(res))
    }
  }

  searchToggle() {
    this.search = !this.search;
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  searchProduct() {
    this.router.navigate(['/product/list'], {
      queryParams: { search: this.searchInput }
    })
    this.searchToggle()
  }

}
