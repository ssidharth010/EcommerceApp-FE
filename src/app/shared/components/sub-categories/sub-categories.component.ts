import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  active_category: string = '';

  constructor(private route: ActivatedRoute, public productService: ProductService) {
    this.route.queryParams.subscribe(params => this.active_category = params?.subcategory ? params.subcategory : '')
    console.log(this.active_category)
  }

  ngOnInit(): void {
  }
}
