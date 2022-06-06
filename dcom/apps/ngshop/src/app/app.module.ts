import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@dcom/ui';

import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@dcom/products';
import { HttpClientModule } from '@angular/common/http';
import { OrdersModule } from '@dcom/orders';
import { MessagesComponent } from './shared/messages/messages.component';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsersModule } from '@dcom/users';

//NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes = [{ path: '', component: HomePageComponent }];
@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent,
        MessagesComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        UiModule,
        AccordionModule,
        ButtonModule,
        ProductsModule,
        OrdersModule,
        ToastModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        UsersModule
    ],
    providers: [MessageService],
    bootstrap: [AppComponent]
})
export class AppModule {}
