import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ProductService } from "../../../services/product.service";

@Component({
  selector: 'app-categories-box',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesBoxComponent implements OnInit {

  @Input() category: any;
  @Input() currency: any = this.productService.Currency; // Default Currency 
  @Input() thumbnail: boolean = false; // Default False 
  @Input() onHowerChangeImage: boolean = false; // Default False
  @Input() cartModal: boolean = false; // Default False
  @Input() loader: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    if(this.loader) {
      this.loader = false; // Skeleton Loader
    }
  }
}
