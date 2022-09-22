import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPayPalModule } from 'ngx-paypal';
import { Ng5SliderModule } from 'ng5-slider';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';

import { ProductLeftSidebarComponent } from './product/sidebar/product-left-sidebar/product-left-sidebar.component';
import { CollectionLeftSidebarComponent } from './collection/collection-left-sidebar/collection-left-sidebar.component';

// Collection Widgets
import { GridComponent } from './collection/widgets/grid/grid.component';
import { PaginationComponent } from './collection/widgets/pagination/pagination.component';
import { ColorsComponent } from './collection/widgets/colors/colors.component';
import { PriceComponent } from './collection/widgets/price/price.component';

import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './checkout/success/success.component';
import { FaqComponent } from '../pages/faq/faq.component';
import { RelatedProductComponent } from './product/widgets/related-product/related-product.component';


@NgModule({
  declarations: [
    ProductLeftSidebarComponent,
    CollectionLeftSidebarComponent,
    GridComponent,
    PaginationComponent,
    ColorsComponent,
    PriceComponent,
    CartComponent,
    WishlistComponent,
    CheckoutComponent,
    SuccessComponent,
    FaqComponent,
    RelatedProductComponent
  ],
  imports: [
    CommonModule,
    NgxPayPalModule,
    Ng5SliderModule,
    InfiniteScrollModule,
    SharedModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
