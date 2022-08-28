import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: any = [];
  public collapse: boolean = true;

  constructor(public productService: ProductService) {
    this.productService.getAllCategories().subscribe((res: any) => this.categories = res.data)
  }

  ngOnInit(): void {
  }
}
