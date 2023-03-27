import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  active_category: string = '';

  constructor(private route: ActivatedRoute, public productService: ProductService) {
    this.route.queryParams.subscribe(params => this.active_category = params?.category ? params.category : '')
    this.productService.getAllCategories().subscribe((res: any) => this.categories = res.data)
  }

  ngOnInit(): void {
  }
}
