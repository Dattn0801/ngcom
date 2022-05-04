import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    products: Product[] = [];
    categories: Category[] = [];
    isCategoryPage!: boolean;

    constructor(
        private proService: ProductsService,
        private catService: CategoriesService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            params['categoryid'] ? this._getPro([params['categoryid']]) : this._getPro();
            params['categoryid'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
        });
        this._getCate();
    }
    private _getPro(categoriesFilter?: string[]) {
        this.proService.getProducts(categoriesFilter).subscribe((pros) => {
            this.products = pros;
        });
    }
    private _getCate() {
        this.catService.getCategories().subscribe((cate) => {
            this.categories = cate;
        });
    }
    // categoryFilter() {
    //     const selectedCategories = this.categories
    //         .filter((cate) => cate.checked)
    //         .map((cate) => cate.id);
    //     this._getPro(selectedCategories);
    // }
    categoryFilter() {
        const selectedCategories = this.categories
            .filter(
                (
                    c
                ): c is typeof c & {
                    checked: true;
                    id: string;
                } => Boolean(c.checked && c.id)
            )
            .map(({ id }) => id);
        this._getPro(selectedCategories);
    }
}
