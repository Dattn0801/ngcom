import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@dcom/ui';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@dcom/products';
import { HttpClientModule } from '@angular/common/http';
import { OrdersModule } from '@dcom/orders';

//font awesome

const routes: Routes = [{ path: '', component: HomePageComponent }];
@NgModule({
    declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        UiModule,
        AccordionModule,
        ButtonModule,
        ProductsModule,
        OrdersModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
