import { CategorieService } from '@/api/services';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-category-create-dialog',
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
  templateUrl: './category-create-dialog.component.html',
  styleUrl: './category-create-dialog.component.scss',
})
export class CategoryCreateDialogComponent {
  category = {
    name: '',
    description: '',
  };

  constructor(
    public dialogRef: MatDialogRef<CategoryCreateDialogComponent>,
    private categorieService: CategorieService,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.categorieService.categoriesPost({ body: this.category }).subscribe({
      next: created => this.dialogRef.close(created),
      error: err => console.error('Category creation failed', err),
    });
  }
}
