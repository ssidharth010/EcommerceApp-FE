import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {

  @Input() subCategories: Array<any>;
  public collapse: boolean = true;

  constructor(public productService: ProductService) {
  }

  ngOnInit(): void {
  }
}
