import { AuthService } from '@/api/services';
import { TokenService } from '@/core/services/token.service';
import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, NgIf, HttpClientModule],
  providers: [HttpClient],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private tokenService: TokenService) {}

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
      .subscribe(
        response => {
          console.log('Login successful', response);
          this.tokenService.setToken(response.token);
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid email or password. Please try again.';
        },
      );
  }
}
