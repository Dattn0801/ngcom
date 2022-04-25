import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@dcom/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-user-list',
    templateUrl: './user-list.component.html',
    styles: []
})
export default class UserListComponent implements OnInit, OnDestroy {
    users: User[] = [];
    endsubs$: Subject<void> = new Subject();
    constructor(
        private usersService: UsersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getUsers();
    }
    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
        //console.log('destroy cate');
    }

    _deleteUser(userId: string) {
        this.confirmationService.confirm({
            message: 'Bạn có muốn xóa khách hàng này không',
            header: 'Xóa khách hàng',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Có',
            rejectLabel: 'Không',
            accept: () => {
                this.usersService
                    .deleteUser(userId)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe(
                        () => {
                            this._getUsers();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Thành công',
                                detail: `User đã được xóa`
                            });
                        },
                        () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Lỗi',
                                detail: 'User chưa được xóa'
                            });
                        }
                    );
            }
        });
    }
    _updateUser(userId: string) {
        this.router.navigateByUrl(`users/form/${userId}`);
    }
    private _getUsers() {
        this.usersService
            .getUsers()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((users) => {
                this.users = users;
            });
    }
    getCountryName(countryKey: string) {
        if (countryKey) return this.usersService.getCountry(countryKey);
        return true;
    }
}
