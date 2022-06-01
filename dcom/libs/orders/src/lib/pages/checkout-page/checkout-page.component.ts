import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, CartService, Order, OrderItem, OrdersService } from '@dcom/orders';
import { UsersService } from '@dcom/users';
import { ORDER_STATUS } from '../../order.constants';

@Component({
    selector: 'orders-checkout-page',
    templateUrl: './checkout-page.component.html',
    styles: []
})
export class CheckoutPageComponent implements OnInit {
    checkoutFormGroup: FormGroup;
    isSubmitted = false;
    orderItems: OrderItem[] = [];
    userId = '622eee7a2ded4891b40092cd';
    countries = [];
    constructor(
        private router: Router,
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private cartService: CartService,
        private ordersService: OrdersService
    ) {}

    ngOnInit(): void {
        this._initCheckoutForm();
        this._getCartItems();
        this._getCountries();
    }
    private _initCheckoutForm() {
        this.checkoutFormGroup = this.formBuilder.group({
            name: ['tên của bạn', Validators.required],
            email: ['email@gmail.com', [Validators.email, Validators.required]],
            phone: ['', Validators.required],
            city: ['', Validators.required],
            country: ['Viet Nam', Validators.required],
            zip: ['7000', Validators.required],
            apartment: ['', Validators.required],
            street: ['', Validators.required]
        });
    }
    placeOrder() {
        this.isSubmitted = true;
        if (this.checkoutFormGroup.invalid) {
            return;
        }
        const order: Order = {
            orderItems: this.orderItems,
            shippingAddress1: this.checkoutForm['street'].value,
            shippingAddress2: this.checkoutForm['apartment'].value,
            city: this.checkoutForm['city'].value,
            zip: this.checkoutForm['zip'].value,
            country: this.checkoutForm['country'].value,
            phone: this.checkoutForm['phone'].value,
            status: 0,
            user: this.userId,
            dateOrdered: `${Date.now()}`
        };
        this.ordersService.createOrder(order).subscribe(
            () => {
                console.log('orderok');
                //redirect to thank you page // payment
                this.cartService.emptyCart();
                this.router.navigate(['/success']);
            },
            () => {
                //display some message to user
            }
        );
    }
    private _getCartItems() {
        const cart: Cart = this.cartService.getCart();
        this.orderItems = cart.items.map((item) => {
            return {
                product: item.productId,
                quantity: item.quantity
            };
        });
    }
    backToCart() {
        this.router.navigate(['/cart']);
    }
    private _getCountries() {
        this.countries = this.usersService.getCountries();
    }
    get checkoutForm() {
        return this.checkoutFormGroup.controls;
    }
}
