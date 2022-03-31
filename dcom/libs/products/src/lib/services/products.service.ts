import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product';
@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    apiURLProducts = environment.apiURL + 'products';
    constructor(private http: HttpClient) {}

    //get all
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiURLProducts);
    }
    // //get one
    // getCategory(categoryId: string): Observable<Category> {
    //     return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`);
    // }
    // //create
    // createCategory(category: Category): Observable<Category> {
    //     return this.http.post<Category>(this.apiURLCategories, category);
    // }
    // //update
    // updateCategory(category: Category): Observable<Category> {
    //     return this.http.put<Category>(`${this.apiURLCategories}/${category.id}`, category);
    // }
    // deleteCategory(categoryId: string): Observable<any> {
    //     return this.http.delete<any>(`${this.apiURLCategories}/${categoryId}`);
    // }
}
