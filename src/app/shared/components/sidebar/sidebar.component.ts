import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

// Import Angular Material Modules directly in the component
import { TokenService } from '@/core/services/token.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

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
    private tokenService: TokenService,
  ) {}

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['/login']);
  }
}
