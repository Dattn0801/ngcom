import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './components/gallery/gallery.component';
import { IncentiveComponent } from './components/incentive/incentive.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { RouterModule, Routes } from '@angular/router';
import { BannerHotComponent } from './components/banner-hot/banner-hot.component';
import { DialogModule } from 'primeng/dialog';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RightBannerComponent } from './components/right-banner/right-banner.component';

const routes: Routes = [
    {
        path: 'contact',
        component: ContactusComponent
    }
];
@NgModule({
    imports: [CommonModule, ButtonModule, RouterModule.forChild(routes), DialogModule],
    declarations: [
        BannerComponent,
        GalleryComponent,
        IncentiveComponent,
        ContactusComponent,
        BannerHotComponent,
        CarouselComponent,
        RightBannerComponent
    ],
    exports: [
        BannerComponent,
        GalleryComponent,
        IncentiveComponent,
        ContactusComponent,
        BannerHotComponent,
        CarouselComponent,
        RightBannerComponent
    ]
})
export class UiModule {}
