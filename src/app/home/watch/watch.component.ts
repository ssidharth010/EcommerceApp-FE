import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductSlider, CollectionSlider } from '../../shared/data/slider';
import { Product } from '../../shared/classes/product';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, OnDestroy {

  public themeLogo: string = 'assets/images/icon/logo-14.png'; // Change Logo
  
  public products: Product[] = [];
  public categories: Product[] = [];
  public productCollections: any[] = [];

  public ProductSliderConfig: any = ProductSlider;
  public CollectionSliderConfig: any = CollectionSlider;

  constructor(private _sanitizer:DomSanitizer,
    public productService: ProductService) {
      this.productService.getAllProducts(4, 1).subscribe((res:any)=>{
        this.products = res.data
      })
      this.productService.getAllCategories().subscribe((res:any)=>{
        this.categories = res.data
      })
  }

  public sliders = [{
    title: 'every time',
    subTitle: 'mittnalier',
    image: 'assets/images/slider/9.jpg'
  }, {
    title: 'welcome to fashion',
    subTitle: 'Men Watch',
    image: 'assets/images/slider/10.jpg'
  }];

  ngOnInit(): void {
    // Change color for this layout
    document.documentElement.style.setProperty('--theme-deafult', '#e4604a');
  }

  ngOnDestroy(): void {
    // Remove Color
    document.documentElement.style.removeProperty('--theme-deafult');
  }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }

}
