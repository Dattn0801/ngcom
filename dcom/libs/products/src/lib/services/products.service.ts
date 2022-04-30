import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product';
@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    apiURLProducts = environment.apiURL + 'products';
    constructor(private http: HttpClient) {}

    //get all
    getProducts(categoriesFilter?: string[]): Observable<Product[]> {
        let params = new HttpParams();
        if (categoriesFilter) {
            params = params.append('categories', categoriesFilter.join(','));
        }
        return this.http.get<Product[]>(this.apiURLProducts, { params: params });
    }
    //get one
    getProduct(productId: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
    }
    //create
    createProduct(productData: FormData): Observable<Product> {
        return this.http.post<Product>(this.apiURLProducts, productData);
    }
    //update
    updateProduct(productData: FormData, productId: string): Observable<Product> {
        return this.http.put<Product>(`${this.apiURLProducts}/${productId}`, productData);
    }
    //delete
    deleteProduct(productId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
    }

    getProductsCount(): Observable<number> {
        return this.http
            .get<number>(`${this.apiURLProducts}/get/count`)
            .pipe(map((objectValue: any) => objectValue.productCount));
    }

    getFeaturedProducts(count: number): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiURLProducts}/get/featured/${count}`);
    }
}
