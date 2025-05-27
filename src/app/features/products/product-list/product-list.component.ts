import { ProductService } from '@/api/services';
import { StrictHttpResponse } from '@/api/strict-http-response';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductCreateDialogComponent } from '../product-create-dialog/product-create-dialog.component';
import { ProductDeleteDialogComponent } from '../product-delete-dialog/product-delete-dialog.component';
import { ProductUpdateDialogComponent } from '../product-update-dialog/product-update-dialog.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    ProductDeleteDialogComponent,
    ProductUpdateDialogComponent, // add update dialog
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'price', 'category', 'stock', 'imageUrl', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  totalProducts = 10000;
  pageSize = 5;
  pageIndex = 0;
  sortActive = 'createdAt';
  sortDirection: 'asc' | 'desc' = 'desc';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe(() => this.onPaginateChange());
    this.sort.sortChange.subscribe(() => this.onSortChange());
  }

  getProducts(): void {
    const sort = this.sortActive ? `${this.sortDirection === 'desc' ? '-' : ''}${this.sortActive}` : undefined;
    this.productService
      .productsGet$Response({
        page: this.pageIndex + 1,
        limit: this.pageSize,
        sort,
      })
      .pipe(
        map((r: StrictHttpResponse<any>): any => {
          const countHeader = r.headers.get('odin-count');
          if (countHeader) {
            this.totalProducts = parseInt(countHeader, 10);
          } else {
            this.totalProducts = 0;
          }
          return r.body;
        }),
      )
      .subscribe({
        next: (data: any) => {
          this.dataSource.data = data;
        },
        error: error => {
          console.error('Error fetching products:', error);
        },
      });
  }

  onPaginateChange(): void {
    this.pageIndex = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.getProducts();
  }

  onSortChange(): void {
    this.sortActive = this.sort.active;
    this.sortDirection = this.sort.direction as 'asc' | 'desc';
    this.getProducts();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ProductCreateDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProducts();
      }
    });
  }

  openDeleteDialog(product: any): void {
    const dialogRef = this.dialog.open(ProductDeleteDialogComponent, {
      width: '400px',
      data: { product },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProducts();
      }
    });
  }

  openUpdateDialog(product: any): void {
    const dialogRef = this.dialog.open(ProductUpdateDialogComponent, {
      width: '500px',
      data: { product },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProducts();
      }
    });
  }
}
