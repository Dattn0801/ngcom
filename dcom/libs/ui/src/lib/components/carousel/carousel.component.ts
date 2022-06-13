import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { isOnRunEffects } from '@ngrx/effects/src/lifecycle_hooks';

interface carouselImage {
    imageSrc: string;
    imageAlt: string;
}
@Component({
    selector: 'ui-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: []
})
export class CarouselComponent implements OnInit {
    constructor() {}
    @Input() images: carouselImage[] = [];
    @Input() indicators = true;
    @Input() controls = true;
    @Input() autoSlide = false;
    @Input() slideInterval = 4000; // Default 3s slide
    selectedIndex = 0;

    ngOnInit(): void {
        if (this.autoSlide) {
            this.autoSlideImage();
        }
    }

    //Change Slide in 3 seconds
    autoSlideImage(): void {
        setInterval(() => {
            this.onNextClick();
        }, this.slideInterval);
    }
    // set index of image on dot/indicator click
    selectImage(index: number): void {
        this.selectedIndex = index;
    }
    onPrevClick(): void {
        if (this.selectedIndex === 0) {
            this.selectedIndex = this.images.length - 1;
        } else {
            this.selectedIndex--;
        }
    }
    onNextClick(): void {
        if (this.selectedIndex === this.images.length - 1) {
            this.selectedIndex = 0;
        } else {
            this.selectedIndex++;
        }
    }
}
