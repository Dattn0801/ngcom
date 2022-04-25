import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Product, ProductsService } from '@dcom/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styles: []
})
export class ProductsFormComponent implements OnInit, OnDestroy {
    editMode = false;
    form: FormGroup;
    isSubmited = false;
    categories = [];
    imageDisplay: string | ArrayBuffer;
    currentProductId: string;
    endsubs$: Subject<void> = new Subject();
    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._getCategories();
        this._checkEditMode();
    }
    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
        //console.log('destroy cate');
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
            image: ['', Validators.required],
            isFeatured: [false]
        });
    }

    _getCategories() {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((cate) => {
                this.categories = cate;
            });
    }

    //Because this product has image, we need submit form data not json data
    onSubmit() {
        this.isSubmited = true;
        if (this.form.invalid) return;
        const productFormData = new FormData();
        Object.keys(this.productForm).map((key) => {
            productFormData.append(key, this.productForm[key].value);
        });
        if (this.editMode) {
            this._updateProduct(productFormData);
        } else {
            this._addProduct(productFormData);
        }
    }
    //Load imange
    onImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.form.patchValue({ image: file });
            this.form.get('image').updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.imageDisplay = fileReader.result;
            };
            fileReader.readAsDataURL(file);
        }
    }

    private _addProduct(productData: FormData) {
        this.productsService
            .createProduct(productData)
            .pipe(takeUntil(this.endsubs$))
            .subscribe(
                (product: Product) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: `Sản phẩm ${product.name} đã được tạo`
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
                        detail: 'Không thể tạo sản phẩm'
                    });
                }
            );
    }
    private _updateProduct(productData: FormData) {
        this.productsService
            .updateProduct(productData, this.currentProductId)
            .pipe(takeUntil(this.endsubs$))
            .subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: `Sản phẩm đã được chỉnh sửa`
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
                        detail: 'Sản phẩm không thể chỉnh sửa'
                    });
                }
            );
    }
    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.currentProductId = params['id'];
                this.productsService
                    .getProduct(params['id'])
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe((pro) => {
                        this.productForm['name'].setValue(pro.name);
                        this.productForm['category'].setValue(pro.category.id);
                        this.productForm['brand'].setValue(pro.brand);
                        this.productForm['price'].setValue(pro.price);
                        this.productForm['countInStock'].setValue(pro.countInStock);
                        this.productForm['isFeatured'].setValue(pro.isFeatured);
                        this.productForm['description'].setValue(pro.description);
                        this.productForm['richDescription'].setValue(pro.richDescription);
                        this.imageDisplay = pro.image;
                        this.productForm['image'].setValidators([]);
                        this.productForm['image'].updateValueAndValidity();
                    });
            }
        });
    }
    onCancel() {
        this.location.back();
    }
    get productForm() {
        return this.form.controls;
    }
}
