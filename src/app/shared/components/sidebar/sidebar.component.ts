import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

// Import Angular Material Modules directly in the component
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { clearToken } from '@/state/token/actions';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, RouterOutlet, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(
    private router: Router,
    private store: Store,
  ) {}

  logout() {
    this.store.dispatch(clearToken());
    this.router.navigate(['/login']);
  }
}
