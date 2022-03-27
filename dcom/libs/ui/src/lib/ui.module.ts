import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
    imports: [CommonModule],
    declarations: [SliderComponent, BannerComponent],
    exports: [SliderComponent, BannerComponent]
})
export class UiModule {}
