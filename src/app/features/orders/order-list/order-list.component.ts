import { OrderService } from '@/api/services';
import { OrderSchema } from '@/api/services/order.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';
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
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['orderNumber', 'createdAt', 'userEmail', 'status', 'totalAmount', 'actions'];
  dataSource = new MatTableDataSource<OrderSchema>([]);
  totalOrders = 10000;
  pageSize = 5;
  pageIndex = 0;
  sortActive = 'createdAt';
  sortDirection: 'asc' | 'desc' = 'desc';
  statuses: string[] = ['pending', 'completed', 'canceled'];
  selectedStatus = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe(() => this.onPaginateChange());
    this.sort.sortChange.subscribe(() => this.onSortChange());
  }

  getOrders(): void {
    // If your API supports pagination and sorting, pass them here
    // Otherwise, fetch all and slice client-side
    const sort = this.sortActive ? `${this.sortDirection === 'desc' ? '-' : ''}${this.sortActive}` : undefined;
    this.orderService
      .ordersGet$Response({
        page: this.pageIndex + 1,
        limit: this.pageSize,
        sort,
        status: this.selectedStatus || undefined,
      })
      .pipe(
        map(r => {
          const countHeader = r.headers.get('odin-count');
          if (countHeader) {
            this.totalOrders = parseInt(countHeader, 10);
          } else {
            this.totalOrders = 0;
          }

          return r.body;
        }),
      )
      .subscribe({
        next: data => {
          this.dataSource.data = data;
        },
        error: error => {
          console.error('Error fetching orders:', error);
        },
      });
  }

  onPaginateChange(): void {
    this.pageIndex = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.getOrders();
  }

  onSortChange(): void {
    this.sortActive = this.sort.active;
    this.sortDirection = this.sort.direction as 'asc' | 'desc';
    this.getOrders();
  }

  applyFilter(): void {
    this.pageIndex = 0;
    this.getOrders();
  }

  viewDetails(order: OrderSchema): void {
    this.router.navigate(['/app/orders', order.id]);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(OrderCreateDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getOrders();
      }
    });
  }
}
