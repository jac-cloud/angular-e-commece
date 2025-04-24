import { ProductService } from '@/api/services';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-product-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './product-delete-dialog.component.html',
  styleUrls: ['./product-delete-dialog.component.scss'],
})
export class ProductDeleteDialogComponent {
  product: any;

  constructor(
    public dialogRef: MatDialogRef<ProductDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
  ) {
    this.product = data.product;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.productService.productsIdDelete({ id: this.product._id }).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => this.dialogRef.close(false),
    });
  }
}
