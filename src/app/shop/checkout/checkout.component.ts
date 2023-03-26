import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

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
    private toastrService: ToastrService,
    private authService: AuthService, 
    private _router: Router) {

    const currentUser = this.authService.currentUserValue;
    this.checkoutForm = this.fb.group({
      firstname: [currentUser.first_name, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: [currentUser.last_name, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]+')]],
      email: [currentUser.email, [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
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
    console.log(this.checkoutForm)
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
    this.checkoutForm.markAllAsTouched()
    if(this.checkoutForm.valid){
      this.productService.submitEnquiry(data).subscribe(res=>{
        localStorage.setItem("cartItems", JSON.stringify([]))
        this.toastrService.success('Enquiry Submitted');
        this._router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      })
    }
  }

  private initConfig(): void {
  }

}
