import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    apiURLOrders = environment.apiURL + 'orders';
    constructor(private http: HttpClient) {}

    //get all
    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiURLOrders);
    }
    //get one
    getOrder(OrderId: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiURLOrders}/${OrderId}`);
    }
    //create
    createOrder(Order: Order): Observable<Order> {
        return this.http.post<Order>(this.apiURLOrders, Order);
    }
    //update
    updateOrder(orderStatus: { status: string }, orderId: string): Observable<Order> {
        return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStatus);
    }
    deleteOrder(OrderId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLOrders}/${OrderId}`);
    }
    getOrdersCount(): Observable<number> {
        return this.http
            .get<number>(`${this.apiURLOrders}/get/count`)
            .pipe(map((objectValue: any) => objectValue.orderCount));
    }

    getTotalSales(): Observable<number> {
        return this.http
            .get<number>(`${this.apiURLOrders}/get/totalsales`)
            .pipe(map((objectValue: any) => objectValue.totalsales));
    }
}
