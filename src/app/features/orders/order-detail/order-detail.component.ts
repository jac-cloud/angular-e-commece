import { OrderService } from '@/api/services';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './order-detail.component.html',
  // styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  order: any;
  statuses: string[] = ['pending', 'completed', 'canceled'];
  selectedStatus = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.orderService.ordersIdGet({ id: idParam }).subscribe(order => {
        this.order = order;
        this.selectedStatus = order.status;
      });
    }
  }

  updateStatus(): void {
    if (!this.order) return;
    this.orderService
      .ordersIdPut({ id: this.order.id, body: { ...this.order, status: this.selectedStatus } })
      .subscribe(() => this.router.navigate(['/app/orders']));
  }

  goBack(): void {
    this.router.navigate(['/app/orders']);
  }
}
