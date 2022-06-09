import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './components/gallery/gallery.component';
import { IncentiveComponent } from './components/incentive/incentive.component';
@NgModule({
    imports: [CommonModule, ButtonModule],
    declarations: [BannerComponent, GalleryComponent, IncentiveComponent],
    exports: [BannerComponent, GalleryComponent, IncentiveComponent]
})
export class UiModule {}
