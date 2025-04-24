import { OrderService, ProductService } from '@/api/services';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [provideCharts(withDefaultRegisterables())],
  imports: [CommonModule, MatCardModule, MatTableModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalSales = 0;
  totalOrders = 0;
  totalProducts = 0;
  recentOrders: any[] = [];

  // Sales by day
  salesByDayLabels: string[] = [];
  salesByDayData: number[] = [];
  salesByDayChartData: ChartData<'bar'> = { labels: [], datasets: [{ data: [], label: 'Sales' }] };
  salesByDayChartOptions: ChartOptions<'bar'> = { responsive: true };

  // Sales by category
  salesByCategoryLabels: string[] = [];
  salesByCategoryData: number[] = [];
  salesByCategoryChartData: ChartData<'pie'> = { labels: [], datasets: [{ data: [] }] };
  salesByCategoryChartOptions: ChartOptions<'pie'> = { responsive: true };

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.loadMetrics();
  }

  private loadMetrics(): void {
    // Fetch total products
    this.productService.productsGet().subscribe(products => {
      this.totalProducts = products.length;
    });

    // Fetch orders
    this.orderService.ordersGet().subscribe((orders: any[]) => {
      this.totalOrders = orders.length;
      this.totalSales = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

      // Recent orders
      this.recentOrders = [...orders]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

      // Sales by day
      const dayMap: { [key: string]: number } = {};
      orders.forEach(o => {
        const day = new Date(o.createdAt).toLocaleDateString();
        dayMap[day] = (dayMap[day] || 0) + (o.totalAmount || 0);
      });
      this.salesByDayLabels = Object.keys(dayMap);
      this.salesByDayData = this.salesByDayLabels.map(day => dayMap[day]);
      this.salesByDayChartData = {
        labels: this.salesByDayLabels,
        datasets: [{ data: this.salesByDayData, label: 'Sales' }],
      };

      // Sales by category (assumes `category` field)
      const catMap: { [key: string]: number } = {};
      orders.forEach(o => {
        const cat = o.category || 'Unknown';
        catMap[cat] = (catMap[cat] || 0) + (o.totalAmount || 0);
      });
      this.salesByCategoryLabels = Object.keys(catMap);
      this.salesByCategoryData = this.salesByCategoryLabels.map(cat => catMap[cat]);
      this.salesByCategoryChartData = {
        labels: this.salesByCategoryLabels,
        datasets: [{ data: this.salesByCategoryData }],
      };
    });
  }
}
