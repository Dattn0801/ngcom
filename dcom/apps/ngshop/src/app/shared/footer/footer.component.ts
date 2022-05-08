import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'dcom-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
    faCoffee = faCoffee;
    constructor() {}

    ngOnInit(): void {}
}
