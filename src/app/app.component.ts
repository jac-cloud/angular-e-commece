import { loadTokenFromStorage } from '@/state/token/actions';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'e-commerce';

  constructor(private store: Store) {
    this.store.dispatch(loadTokenFromStorage());
  }
}
