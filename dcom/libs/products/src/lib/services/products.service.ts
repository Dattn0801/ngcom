import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
