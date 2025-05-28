import { CategorieService, ProductService } from '@/api/services';
import { CategorieSchema } from '@/api/services/categorie.service';
import { ProductSchema } from '@/api/services/product.service';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-update-dialog',
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
  ],
  templateUrl: './product-update-dialog.component.html',
  styleUrl: './product-update-dialog.component.scss',
})
export class ProductUpdateDialogComponent implements OnInit {
  product: ProductSchema;
  categories: CategorieSchema[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProductUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: ProductSchema },
    private categoryService: CategorieService,
    private productService: ProductService,
  ) {
    // Clone the product to avoid mutating the original reference
    this.product = { ...data.product };
  }

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
    this.productService.productsIdPut({ id: this.product.id, body: this.product }).subscribe({
      next: updated => this.dialogRef.close(updated),
      error: err => console.error('Product update failed', err),
    });
  }
}
