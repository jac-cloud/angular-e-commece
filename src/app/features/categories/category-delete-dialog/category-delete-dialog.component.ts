import { CategorieService } from '@/api/services';
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
  selector: 'app-category-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './category-delete-dialog.component.html',
  styleUrls: ['./category-delete-dialog.component.scss'],
})
export class CategoryDeleteDialogComponent {
  category: any;

  constructor(
    public dialogRef: MatDialogRef<CategoryDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categorieService: CategorieService,
  ) {
    this.category = data.category;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.categorieService.categoriesIdDelete({ id: this.category._id }).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => this.dialogRef.close(false),
    });
  }
}
