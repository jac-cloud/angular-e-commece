import { ProductService } from '@/api/services';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductCreateDialogComponent } from '../product-create-dialog/product-create-dialog.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatTooltipModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'price', 'category', 'stock', 'imageUrl', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  // Fetch products from the service
  getProducts(): void {
    this.productService.productsGet().subscribe({
      next: data => {
        this.dataSource.data = data; // Assign products to the dataSource
      },
      error: error => {
        console.error('Error fetching products:', error);
      },
    });
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
}
