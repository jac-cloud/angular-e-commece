import { CategorieService, ProductService } from '@/api/services';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './product-create-dialog.component.html',
  styleUrl: './product-create-dialog.component.scss',
})
export class ProductCreateDialogComponent implements OnInit {
  product = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: '',
    imageUrl: '',
  };

  categories: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProductCreateDialogComponent>,
    private categoryService: CategorieService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.categoryService.categoriesGet().subscribe({
      next: data => (this.categories = data),
      error: err => console.error('Failed to fetch categories', err),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.productService.productsPost({ body: this.product }).subscribe({
      next: created => this.dialogRef.close(created),
      error: err => console.error('Product creation failed', err),
    });
  }
}
