import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {

  public subCategories: any = [{
    name: 'ddd',
    _id: '1212121212'
  }];
  public collapse: boolean = true;

  constructor(public productService: ProductService) {
    // this.productService.getAllCategories().subscribe((res: any) => this.subCategories = res.data)
  }

  ngOnInit(): void {
  }
}
