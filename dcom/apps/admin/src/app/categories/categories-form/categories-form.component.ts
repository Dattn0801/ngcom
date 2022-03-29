import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@dcom/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styles: []
})
export class CategoriesFormComponent implements OnInit {
    form: FormGroup;
    isSubmited = false;
    editMode = false;
    currentCategoryId: string;
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
            icon: ['', Validators.required]
        });
        this._checkEditMode();
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
            icon: this.categoryForm['icon'].value
        };
        if (this.editMode) {
            this._updateCategory(category);
        } else {
            this._addCategory(category);
        }
    }
    private _addCategory(category: Category) {
        this.categoriesService.createCategory(category).subscribe(
            (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Danh mục đã được tạo'
                });
                timer(2000)
                    .toPromise()
                    .then((done) => {
                        this.location.back();
                    });
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Thất bại',
                    detail: 'Không thể tạo danh mục'
                });
            }
        );
    }
    private _updateCategory(category: Category) {
        this.categoriesService.updateCategory(category).subscribe(
            (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Danh mục đã được chỉnh sửa'
                });
                timer(2000)
                    .toPromise()
                    .then((done) => {
                        this.location.back();
                    });
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Danh mục không thể chỉnh sửa'
                });
            }
        );
    }
    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.currentCategoryId = params['id'];
                this.categoriesService.getCategory(params['id']).subscribe((category) => {
                    this.categoryForm['name'].setValue(category.name);
                    this.categoryForm['icon'].setValue(category.icon);
                });
            }
        });
    }

    get categoryForm() {
        return this.form.controls;
    }
}
