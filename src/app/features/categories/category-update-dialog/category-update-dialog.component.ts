import { CategorieService } from '@/api/services';
import { CategorieSchema } from '@/api/services/categorie.service';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-category-update-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './category-update-dialog.component.html',
  styleUrl: './category-update-dialog.component.scss',
})
export class CategoryUpdateDialogComponent implements OnInit {
  category: Partial<CategorieSchema> = {};

  constructor(
    public dialogRef: MatDialogRef<CategoryUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: CategorieSchema },
    private categorieService: CategorieService,
  ) {
    this.category = { ...data.category };
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.category.id) {
      return console.error('Category ID is required for update');
    }

    this.categorieService.categoriesIdPut({ id: this.category.id, body: this.category }).subscribe({
      next: updated => this.dialogRef.close(updated),
      error: err => console.error('Category update failed', err),
    });
  }
}
