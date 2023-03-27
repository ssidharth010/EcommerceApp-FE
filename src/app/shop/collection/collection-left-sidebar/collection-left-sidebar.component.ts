import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from "../../../shared/services/product.service";
import { Product } from '../../../shared/classes/product';

@Component({
  selector: 'app-collection-left-sidebar',
  templateUrl: './collection-left-sidebar.component.html',
  styleUrls: ['./collection-left-sidebar.component.scss']
})
export class CollectionLeftSidebarComponent implements OnInit {
  
  public grid: string = 'col-xl-3 col-md-6';
  public layoutView: string = 'grid-view';
  public products: Product[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 1200;
  public category: string;
  public subcategory: string;
  public pageNo: number = 1;
  public pageSize: number = 8;
  public paginate: any = {}; // Pagination use only
  public sortBy: string; // Sorting Order
  public mobileSidebar: boolean = false;
  public loader: boolean = true;
  public subcategoryList: any[] = [];
  public search: string;

  constructor(private route: ActivatedRoute, private router: Router,
    private viewScroller: ViewportScroller, public productService: ProductService) {   
      // Get Query params..
      this.route.queryParams.subscribe(params => {
        this.search = params.search ? params.search : null;
        this.minPrice = params.minPrice ? params.minPrice : this.minPrice;
        this.maxPrice = params.maxPrice ? params.maxPrice : this.maxPrice;
        this.category = params.category ? params.category : null;
        this.subcategory = params.subcategory ? params.subcategory : null;
        this.sortBy = params.sortBy ? params.sortBy : 'ascending';
        this.pageNo = params.page ? params.page : this.pageNo;


        if(this.category){
          this.productService.getSubCategByCategId(this.category).subscribe((res:any)=>{ this.subcategoryList = res.data})
        }

        this.productService.getAllProducts(this.pageSize, this.pageNo, this.category, this.subcategory, this.minPrice, this.maxPrice, this.search).subscribe((response:any) => { 
          this.products = response.data;
          this.paginate = this.productService.getPager(response.meta.count, +this.pageNo, this.pageSize);         
        })

        // // Get Filtered Products..
        // this.productService.filterProducts().subscribe(response => {         
        //   // Sorting Filter
        //   this.products = this.productService.sortProducts(response, this.sortBy);
        //   // Category Filter
        //   if(params.category)
        //     this.products = this.products.filter(item => item.type == this.category);
        //   // Price Filter
        //   this.products = this.products.filter(item => item.price >= this.minPrice && item.price <= this.maxPrice) 
        //   // Paginate Products
        //   this.paginate = this.productService.getPager(this.products.length, +this.pageNo);     // get paginate object from service
          this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items
        // })
      })
  }

  ngOnInit(): void {
  }


  // Append filter value to Url
  updateFilter(tags: any) {
    tags.page = null; // Reset Pagination
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: tags,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      // this.viewScroller.setOffset([120, 120]);
      // this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // SortBy Filter
  sortByFilter(value) {
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null},
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      // this.viewScroller.setOffset([120, 120]);
      // this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // product Pagination
  setPage(page: number) {
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      // this.viewScroller.setOffset([120, 120]);
      // this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if(value == 'list-view')
      this.grid = 'col-lg-12';
    else
      this.grid = 'col-xl-3 col-md-6';
  }

  // Mobile sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

}
