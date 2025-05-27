import { OrderItemService, OrderService, ProductService, UserService } from '@/api/services';
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
  styleUrls: ['./order-create-dialog.component.scss'],
})
export class OrderCreateDialogComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  userSearch = '';
  selectedUserId = '';
  selectedUser: any = null;
  statuses: string[] = ['pending', 'completed', 'canceled'];
  selectedStatus = 'pending';
  products: any[] = [];
  items: Array<{ productId: string; quantity: number }> = [];

  constructor(
    public dialogRef: MatDialogRef<OrderCreateDialogComponent>,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
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
    this.productService.productsGet().subscribe({
      next: data => (this.products = data),
      error: err => console.error('Failed to fetch products', err),
    });

    // load orderItems
    this.orderItemService.orderitemsGet().subscribe({
      next: data => console.log('Order items loaded', data),
      error: err => console.error('Failed to fetch order items', err),
    });

    // load users
    this.userService.usersGet().subscribe({
      next: data => {
        this.users = data;
        this.filteredUsers = data;
      },
      error: err => console.error('Failed to fetch users', err),
    });
  }

  addItem(): void {
    this.items.push({ productId: '', quantity: 1 });
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  /** Filter users list based on search input (by email) */
  filterUsers(): void {
    const term = this.userSearch.toLowerCase();
    this.filteredUsers = this.users.filter(u => u.email && u.email.toLowerCase().includes(term));
  }

  /** Called when a user is selected from autocomplete */
  onUserSelected(email: string): void {
    const user = this.users.find(u => u.email === email);
    if (user) {
      this.selectedUserId = user.id;
      this.selectedUser = user;
      this.userSearch = user.email;
    }
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
      totalAmount: this.totalAmount,
    };
    this.orderService.ordersPost({ body }).subscribe({
      next: created => {
        // for each item create an order item
        const orderId = created.id;

        // order item must have productId, quantity, and price
        const orderItemsPayloads = this.items.map(item => {
          const product = this.products.find(p => p.id === item.productId);
          return {
            orderId,
            productId: item.productId,
            quantity: item.quantity,
            price: product?.price || 0,
          };
        });

        const promises = orderItemsPayloads.map<Promise<any>>(
          orderItem =>
            new Promise((resolve, reject) => {
              this.orderItemService.orderitemsPost({ body: orderItem }).subscribe({
                next: data => resolve(data),
                error: err => reject(err),
              });
            }),
        );

        Promise.all(promises).then(created => {
          this.dialogRef.close(created);
        });
      },
      error: err => console.error('Order creation failed', err),
    });
  }
}
