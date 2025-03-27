import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '@/api/services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    NgIf,
    HttpClientModule
  ],
  providers: [HttpClient],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    this.errorMessage = null; // Reset error message
    console.log('Form submitted');

    this.authService.authPost({
      header: {
        // BasicAuth
        Authorization: 'Basic ' + btoa(form.value.email + ':' + form.value.password)
      }
    }).subscribe(
      (response) => {
        console.log('Login successful', response);
        // Save to loczalstorage response.token
        localStorage.setItem('token', response.token);
      },
      (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    );
  }
}
