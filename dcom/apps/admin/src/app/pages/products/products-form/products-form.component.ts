import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '@dcom/products';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styles: []
})
export class ProductsFormComponent implements OnInit {
    editMode = false;
    form: FormGroup;
    isSubmited = false;
    categories = [];
    constructor(private formBuilder: FormBuilder, private categoriesService: CategoriesService) {}

    ngOnInit(): void {
        this._initForm();
        this._getCategories();
    }
    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: ['', Validators.required],
            image: [''],
            isFeatured: ['']
        });
    }
    get productForm() {
        return this.form.controls;
    }
    _getCategories() {
        this.categoriesService.getCategories().subscribe((cate) => {
            this.categories = cate;
        });
    }
    onCancel() {}
    onSubmit() {}
}
