import { CategorieService } from '@/api/services';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CategoryCreateDialogComponent } from '../category-create-dialog/category-create-dialog.component';
import { CategoryDeleteDialogComponent } from '../category-delete-dialog/category-delete-dialog.component';
import { CategoryUpdateDialogComponent } from '../category-update-dialog/category-update-dialog.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CategoryCreateDialogComponent,
    CategoryDeleteDialogComponent,
    CategoryUpdateDialogComponent, // add update dialog
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private categorieService: CategorieService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categorieService.categoriesGet().subscribe({
      next: data => {
        this.dataSource.data = data;
      },
      error: error => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(CategoryCreateDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCategories();
      }
    });
  }

  onEdit(category: any): void {
    const dialogRef = this.dialog.open(CategoryUpdateDialogComponent, {
      width: '500px',
      data: { category },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCategories();
      }
    });
  }

  onDelete(category: any): void {
    const dialogRef = this.dialog.open(CategoryDeleteDialogComponent, {
      width: '400px',
      data: { category },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCategories();
      }
    });
  }
}
