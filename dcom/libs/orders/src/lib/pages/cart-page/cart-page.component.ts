import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDetailed, OrdersService } from '@dcom/orders';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ProductsService } from '@dcom/products';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styles: []
})
export class CartPageComponent implements OnInit, OnDestroy {
    cartItemsDetailed: CartItemDetailed[] = [];
    cartCount = 0;
    endSubs$: Subject<void> = new Subject();
    constructor(
        private router: Router,
        private cartService: CartService,
        private ordersService: OrdersService
    ) {}

    ngOnInit(): void {
        this._getCartDetails();
    }
    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
        //console.log('destroy cate');
    }
    private _getCartDetails() {
        this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((respCart) => {
            this.cartItemsDetailed = [];
            this.cartCount = respCart?.items.length ?? 0;

            respCart.items.forEach((cartItem) => {
                this.ordersService.getProduct(cartItem.productId).subscribe((resProduct) => {
                    this.cartItemsDetailed.push({
                        product: resProduct,
                        quantity: cartItem.quantity
                    });
                });
            });
        });
    }
    backToShop() {
        this.router.navigate(['/products']);
    }
    deleteCartItem(cartItem: CartItemDetailed) {
        this.cartService.deleteCartItem(cartItem.product.id);
    }
    updateCartItemQuantity(event, cartItem: CartItemDetailed) {
        this.cartService.setCartItem(
            {
                productId: cartItem.product.id,
                quantity: event.value
            },
            true
        );
    }
}
