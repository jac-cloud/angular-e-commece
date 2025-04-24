import { CategorieService } from '@/api/services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
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
    MatPaginatorModule,
    MatSortModule,
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
  totalCategories = 10000;
  pageSize = 5;
  pageIndex = 0;
  sortActive = 'createdAt';
  sortDirection: 'asc' | 'desc' = 'desc';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categorieService: CategorieService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe(() => this.onPaginateChange());
    this.sort.sortChange.subscribe(() => this.onSortChange());
  }

  getCategories(): void {
    const sort = this.sortActive ? `${this.sortDirection === 'desc' ? '-' : ''}${this.sortActive}` : undefined;
    this.categorieService
      .categoriesGet({
        page: this.pageIndex + 1,
        limit: this.pageSize,
        sort,
      })
      .subscribe({
        next: (data: any) => {
          this.dataSource.data = data;
        },
        error: error => {
          console.error('Error fetching categories:', error);
        },
      });
  }

  onPaginateChange(): void {
    this.pageIndex = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.getCategories();
  }

  onSortChange(): void {
    this.sortActive = this.sort.active;
    this.sortDirection = this.sort.direction as 'asc' | 'desc';
    this.getCategories();
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
