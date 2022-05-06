import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { PrimeNGConfig } from 'primeng/api';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CartItem, CartService } from '@dcom/orders';

@Component({
    selector: 'product-page',
    templateUrl: './product-page.component.html',
    styles: []
})
export class ProductPageComponent implements OnInit, OnDestroy {
    product!: Product;
    endSubs$: Subject<void> = new Subject();
    quantity = 1;
    constructor(
        private proService: ProductsService,
        private route: ActivatedRoute,
        private primengConfig: PrimeNGConfig,
        private cartService: CartService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['productid']) {
                this._getProduct(params['productid']);
            }
        });
        this.primengConfig.ripple = true;
    }
    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }
    _getProduct(id: string) {
        this.proService
            .getProduct(id)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((resPrO) => {
                this.product = resPrO;
            });
    }
    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: this.quantity
        };
        this.cartService.setCartItem(cartItem);
    }
}
