import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { takeUntil } from 'rxjs';
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
    category: Category;
    //sort
    sortOptions: SelectItem[];
    sortOrder: number;
    sortField: string;
    sortKey: string;

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
        this.sortOptions = [
            { label: 'Từ thấp đến cao', value: '!price' },
            { label: 'Từ cao đến thấp', value: 'price' }
        ];
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

    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
}
