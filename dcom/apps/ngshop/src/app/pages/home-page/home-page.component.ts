import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'dcom-home-page',
    templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
    // eslint-disable-next-line @typescript-eslint/member-ordering
    images = [
        {
            imageSrc: 'assets/images/carousel/op dan.webp',
            imageAlt: 'nature1'
        },
        {
            imageSrc: 'assets/images/carousel/Asus gaming.webp',
            imageAlt: 'nature2'
        },
        {
            imageSrc: 'assets/images/carousel/xiaomi_p1.webp',
            imageAlt: 'person1'
        },
        {
            imageSrc: 'assets/images/carousel/matebook-d15.jpg',
            imageAlt: 'person2'
        }
    ];
}
