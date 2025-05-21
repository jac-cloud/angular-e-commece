import { OrderService, ProductService, UserService } from '@/api/services';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-order-create-dialog',
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
    MatAutocompleteModule,
    MatIconModule,
  ],
  templateUrl: './order-create-dialog.component.html',
})
export class OrderCreateDialogComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  userSearch = '';
  selectedUserId = '';
  statuses: string[] = ['pending', 'completed', 'canceled'];
  selectedStatus = 'pending';
  products: any[] = [];
  items: Array<{ productId: string; quantity: number }> = [];

  constructor(
    public dialogRef: MatDialogRef<OrderCreateDialogComponent>,
    private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService,
  ) {
    this.addItem();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // load products
    this.productService.productsGet().subscribe(data => (this.products = data));
    // load users
    this.userService.usersGet().subscribe(data => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  addItem(): void {
    this.items.push({ productId: '', quantity: 1 });
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  /** Filter users list based on search input */
  filterUsers(): void {
    const term = this.userSearch.toLowerCase();
    this.filteredUsers = this.users.filter(u => u.id.toLowerCase().includes(term));
  }

  get totalAmount(): number {
    return this.items.reduce((sum, item) => {
      const p = this.products.find(p => p.id === item.productId);
      return sum + (p?.price || 0) * item.quantity;
    }, 0);
  }

  onSave(): void {
    if (!this.selectedUserId) {
      console.error('User selection is required');
      return;
    }
    const body: any = {
      userId: this.selectedUserId,
      status: this.selectedStatus,
      items: this.items,
      totalAmount: this.totalAmount,
    };
    this.orderService.ordersPost({ body }).subscribe({
      next: created => this.dialogRef.close(created),
      error: err => console.error('Order creation failed', err),
    });
  }
}
