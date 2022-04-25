import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@dcom/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ORDER_STATUS } from '../order.constants';
@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: []
})
export class OrdersListComponent implements OnInit, OnDestroy {
    order: Order[] = [];
    orderStatus = ORDER_STATUS;
    endsubs$: Subject<void> = new Subject();

    constructor(
        private ordersService: OrdersService,
        private Router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this._getOrder();
    }
    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
        //console.log('destroy cate');
    }
    _getOrder() {
        this.ordersService
            .getOrders()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((order) => {
                this.order = order;
            });
    }
    showOrder(orderId) {
        this.Router.navigateByUrl(`orders/${orderId}`);
    }
    deleteOrder(orderId: string) {
        this.confirmationService.confirm({
            message: 'Bạn có muốn xóa đơn hàng này?',
            header: 'Xóa đơn hàng',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ordersService
                    .deleteOrder(orderId)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe(
                        () => {
                            this._getOrder();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Đơn hàng đã xóa'
                            });
                        },
                        () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Không thể xóa đơn hàng'
                            });
                        }
                    );
            }
        });
    }
}
