import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm:  FormGroup;
  public products: Product[] = [];
  public payment: string = 'Stripe';
  public amount:  any;

  constructor(private fb: FormBuilder,
    public productService: ProductService,
    private orderService: OrderService) { 
    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['', Validators.required],
      town: ['', Validators.required],
      state: ['', Validators.required],
      postalcode: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.productService.cartItems.subscribe(response => this.products = response);
    this.getTotal.subscribe(amount => this.amount = amount);
    this.initConfig();
  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }
  stripeCheckout() {
  }
  private initConfig(): void {
  }

}
