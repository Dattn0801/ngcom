import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, CartService, Order, OrderItem, OrdersService } from '@dcom/orders';
import { UsersService } from '@dcom/users';
import { Subject, takeUntil } from 'rxjs';
import { ORDER_STATUS } from '../../order.constants';
import { StripeService } from 'ngx-stripe';

@Component({
    selector: 'orders-checkout-page',
    templateUrl: './checkout-page.component.html',
    styles: []
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
    checkoutFormGroup: FormGroup;
    isSubmitted = false;
    orderItems: OrderItem[] = [];
    userId: string;
    countries = [];
    unsubscribe$: Subject<void> = new Subject();
    constructor(
        private router: Router,
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private cartService: CartService,
        private ordersService: OrdersService,
        private stripeService: StripeService
    ) {}

    ngOnInit(): void {
        this._autoFillUserData();
        this._initCheckoutForm();
        this._getCartItems();
        this._getCountries();
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
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
    private _autoFillUserData() {
        this.usersService
            .observeCurrentUser()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((user) => {
                if (user) {
                    this.userId = user.id;
                    this.checkoutForm['name'].setValue(user.name);
                    this.checkoutForm['email'].setValue(user.email);
                    this.checkoutForm['phone'].setValue(user.phone);
                    this.checkoutForm['city'].setValue(user.city);
                    this.checkoutForm['street'].setValue(user.street);
                    this.checkoutForm['country'].setValue(user.country);
                    this.checkoutForm['zip'].setValue(user.zip);
                    this.checkoutForm['apartment'].setValue(user.apartment);
                }
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
        this.ordersService.cacheOrderData(order);
        this.ordersService.createCheckoutSession(this.orderItems).subscribe((error) => {
            if (error) {
                console.log('error payment');
            }
        });
        // this.ordersService.createOrder(order).subscribe(
        //     () => {
        //         console.log('orderok');
        //         //redirect to thank you page // payment
        //         this.cartService.emptyCart();
        //         this.router.navigate(['/success']);
        //     },
        //     () => {
        //         //display some message to user
        //     }
        // );
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
