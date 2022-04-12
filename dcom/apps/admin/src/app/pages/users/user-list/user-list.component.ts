import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@dcom/users';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'admin-user-list',
    templateUrl: './user-list.component.html',
    styles: []
})
export class UserListComponent implements OnInit {
    users: User[] = [];
    constructor(
        private usersService: UsersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getUsers();
    }

    _deleteUser(userId: string) {
        this.confirmationService.confirm({
            message: 'Bạn có muốn xóa danh mục này không',
            header: 'Xóa danh mục',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Có',
            rejectLabel: 'Không',
            accept: () => {
                this.usersService.deleteUser(userId).subscribe(
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
        this.router.navigateByUrl(`products/form/${userId}`);
    }

    private _getUsers() {
        this.usersService.getUsers().subscribe((users) => {
            this.users = users;
        });
    }
}
