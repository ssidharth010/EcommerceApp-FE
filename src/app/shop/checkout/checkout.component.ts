import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { ToastrService } from 'ngx-toastr';

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
    private orderService: OrderService,
    private toastrService: ToastrService) { 
    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      // country: ['', Validators.required],
      // town: ['', Validators.required],
      // state: ['', Validators.required],
      // postalcode: ['', Validators.required]
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

  submitEnquiry(){
    const selectedProdIds = this.products.map(product=> product._id);
    const formValues = this.checkoutForm.value
    const data = {
      first_name: formValues.firstname,
      last_name: formValues.lastname,
      email: formValues.email,
      address: formValues.address,
      phone: formValues.phone,
      product_ids: selectedProdIds
    }
    this.productService.submitEnquiry(data).subscribe(res=>{
      localStorage.setItem("cartItems", JSON.stringify([]))
      this.toastrService.success('Enquiry Submitted');
    })
  }

  private initConfig(): void {
  }

}
