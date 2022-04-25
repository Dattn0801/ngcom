import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@dcom/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styles: []
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
    form: FormGroup;
    isSubmited = false;
    editMode = false;
    currentCategoryId: string;
    endsubs$: Subject<void> = new Subject();
    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required],
            color: ['#fff']
        });
        this._checkEditMode();
    }
    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
        //console.log('destroy cate-form');
    }

    onSubmit() {
        this.isSubmited = true;
        //console.log(this.form.controls['name'].value);
        //console.log(this.categoryForm['name'].value);
        if (this.form.invalid) {
            return;
        }
        const category: Category = {
            id: this.currentCategoryId,
            name: this.categoryForm['name'].value,
            icon: this.categoryForm['icon'].value,
            color: this.categoryForm['color'].value
        };
        if (this.editMode) {
            this._updateCategory(category);
        } else {
            this._addCategory(category);
        }
    }
    private _addCategory(category: Category) {
        this.categoriesService
            .createCategory(category)
            .pipe(takeUntil(this.endsubs$))
            .subscribe(
                (category: Category) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: `Danh mục ${category.name} đã được tạo`
                    });
                    timer(2000)
                        .toPromise()
                        .then(() => {
                            this.location.back();
                        });
                },
                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Lỗi',
                        detail: 'Không thể tạo danh mục'
                    });
                }
            );
    }
    private _updateCategory(category: Category) {
        this.categoriesService
            .updateCategory(category)
            .pipe(takeUntil(this.endsubs$))
            .subscribe(
                (category: Category) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: `Danh mục${category.name} đã được chỉnh sửa`
                    });
                    timer(2000)
                        .toPromise()
                        .then(() => {
                            this.location.back();
                        });
                },
                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Lỗi',
                        detail: 'Danh mục không thể chỉnh sửa'
                    });
                }
            );
    }
    private _checkEditMode() {
        this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.currentCategoryId = params['id'];
                this.categoriesService.getCategory(params['id']).subscribe((category) => {
                    this.categoryForm['name'].setValue(category.name);
                    this.categoryForm['icon'].setValue(category.icon);
                    this.categoryForm['color'].setValue(category.color);
                });
            }
        });
    }
    onCancel() {
        this.location.back();
    }
    get categoryForm() {
        return this.form.controls;
    }
}
