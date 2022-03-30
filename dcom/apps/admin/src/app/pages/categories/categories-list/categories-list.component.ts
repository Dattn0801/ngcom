import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@dcom/products';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit {
    categories: Category[] = [];
    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getCategories();
    }
    deleteCategory(categoryId: string) {
        this.confirmationService.confirm({
            message: 'Bạn có muốn xóa danh mục này không',
            header: 'Xóa danh mục',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Có',
            rejectLabel: 'Không',
            accept: () => {
                this.categoriesService.deleteCategory(categoryId).subscribe(
                    (category: Category) => {
                        this._getCategories();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Thành công',
                            detail: `Danh mục ${category.name} đã được xóa`
                        });
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Lỗi',
                            detail: 'Danh mục không được xóa'
                        });
                    }
                );
            }
        });
    }
    updateCategory(categoryId: string) {
        this.router.navigateByUrl(`categories/form/${categoryId}`);
    }
    private _getCategories() {
        this.categoriesService.getCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }
}
