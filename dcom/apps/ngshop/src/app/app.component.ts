import { Component } from '@angular/core';
import { UsersService } from '@dcom/users';

@Component({
    selector: 'dcom-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private usersService: UsersService) {}
    ngOnInit() {
        this.usersService.initAppSession();
    }
    title = 'ngshop';
}
