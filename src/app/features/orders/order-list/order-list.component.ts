import { OrderService } from '@/api/services';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { OrderCreateDialogComponent } from '../order-create-dialog/order-create-dialog.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
  ],
  templateUrl: './order-list.component.html',
  // styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'createdAt', 'status', 'totalAmount', 'actions'];
  statuses: string[] = ['pending', 'completed', 'canceled'];
  selectedStatus = '';

  constructor(
    private orderService: OrderService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.ordersGet().subscribe(orders => {
      this.dataSource.data = orders;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    if (!this.selectedStatus) {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filterPredicate = (data, filter) => data.status === filter;
      this.dataSource.filter = this.selectedStatus;
    }
  }

  viewDetails(order: any): void {
    this.router.navigate(['/app/orders', order.id]);
  }

  openCreateDialog(): void {
    const ref = this.dialog.open(OrderCreateDialogComponent, {
      width: '400px',
    });
    ref.afterClosed().subscribe(created => {
      if (created) {
        this.getOrders();
      }
    });
  }
}
