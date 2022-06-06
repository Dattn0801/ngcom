import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuard } from '@dcom/users';

export const ordersRoutes: Route[] = [];
const routes: Routes = [
    { path: 'cart', component: CartPageComponent },
    { path: 'checkout', canActivate: [AuthGuard], component: CheckoutPageComponent },
    { path: 'success', component: ThankYouComponent }
];
@NgModule({
    imports: [
        ButtonModule,
        BadgeModule,
        CommonModule,
        RouterModule.forChild(routes),
        InputNumberModule,
        FormsModule,
        InputTextModule,
        InputMaskModule,
        DropdownModule,
        ReactiveFormsModule
    ],
    declarations: [
        CartIconComponent,
        CartPageComponent,
        OrderSummaryComponent,
        CheckoutPageComponent,
        ThankYouComponent
    ],
    exports: [CartIconComponent, CartPageComponent]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
