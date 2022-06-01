import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@dcom/orders';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styles: []
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
    order: Order;
    orderStatuses = [];
    selectedStatus: number;
    endsubs$: Subject<void> = new Subject();
    constructor(
        private orderService: OrdersService,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._mapOrderStatus();
        this._getOrder();
    }
    ngOnDestroy(): void {
        this.endsubs$.next();
        this.endsubs$.complete();
        //console.log('destroy cate');
    }
    private _mapOrderStatus() {
        this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
            return {
                id: key,
                name: ORDER_STATUS[key].label
            };
        });
    }
    private _getOrder() {
        this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
            if (params['id']) {
                this.orderService.getOrder(params['id']).subscribe((order) => {
                    this.order = order;
                    this.selectedStatus = order.status;
                });
            }
        });
    }

    onStatusChange(event) {
        this.orderService
            .updateOrder({ status: event.value }, this.order['id'])
            .pipe(takeUntil(this.endsubs$))
            .subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: 'Đơn hàng đã được cập nhật'
                    });
                },
                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Thất bại',
                        detail: 'Đơn hàng không thể cập nhật'
                    });
                }
            );
    }
}
