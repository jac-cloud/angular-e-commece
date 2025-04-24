import { AuthService } from '@/api/services';
import { setToken } from '@/state/actions/token.actions';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, NgIf, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router,
  ) {}

  onSubmit(form: NgForm) {
    this.errorMessage = null; // Reset error message
    console.log('Form submitted');

    this.authService
      .authPost({
        header: {
          // BasicAuth
          Authorization: 'Basic ' + btoa(form.value.email + ':' + form.value.password),
        },
      })
      .subscribe({
        next: response => {
          console.log('Login successful', response);
          this.store.dispatch(setToken({ token: response.token }));
          this.router.navigate(['/app']);
        },
        error: error => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid email or password. Please try again.';
        },
      });
  }
}
