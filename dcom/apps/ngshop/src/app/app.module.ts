import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@dcom/ui';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@dcom/products';
const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'products', component: ProductListComponent }
];
@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        ProductListComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        UiModule,
        AccordionModule,
        ButtonModule,
        ProductsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
