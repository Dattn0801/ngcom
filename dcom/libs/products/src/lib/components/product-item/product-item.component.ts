import { Component, Input, OnInit } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CartService, CartItem } from '@dcom/orders';
import { Product } from '../../models/product';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styles: []
})
export class ProductItemComponent implements OnInit {
    @Input() product!: Product;
    constructor(private cartService: CartService) {}

    ngOnInit(): void {}
    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: 1
        };
        this.cartService.setCartItem(cartItem);
    }
}
