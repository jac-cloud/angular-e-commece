import { CategorieService } from '@/api/services';
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
    MatDialogClose,
  ],
  templateUrl: './category-update-dialog.component.html',
  styleUrl: './category-update-dialog.component.scss',
})
export class CategoryUpdateDialogComponent implements OnInit {
  category: any = {};

  constructor(
    public dialogRef: MatDialogRef<CategoryUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categorieService: CategorieService,
  ) {
    this.category = { ...data.category };
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.categorieService.categoriesIdPut({ id: this.category._id, body: this.category }).subscribe({
      next: updated => this.dialogRef.close(updated),
      error: err => console.error('Category update failed', err),
    });
  }
}
