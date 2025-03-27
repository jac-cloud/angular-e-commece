import { AuthService } from '@/api/services';
import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.errorMessage = null; // Reset error message

    if (form.value.password !== form.value.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      form.controls['confirmPassword'].setErrors({ incorrect: true });
      return;
    }

    this.authService.authRegisterPost({
      body: {
        name: form.value.username,
        email: form.value.email,
        password: form.value.password
      },
    }).subscribe(
      (response) => {
        console.log('Registration successful', response);

        // Go to login page
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
        this.errorMessage = error.error.message || 'Registration failed. Please try again.';
      }
    );
  }
}
