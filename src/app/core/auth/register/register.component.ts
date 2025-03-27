import { AuthService } from '@/api/services';
import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

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
  constructor(private authService: AuthService) {
  }

  onSubmit(form: NgForm) {
    console.log('Form submitted', form);
    if (form.value.password !== form.value.confirmPassword) {
      form.controls['confirmPassword'].setErrors({ 'incorrect': true });
      console.log('Passwords do not match');
      return;
    }

    console.log('Form submitted', form.value);

    this.authService.authRegisterPost({
      body: {
        name: form.value.username,
        email: form.value.email,
        password: form.value.password
      },
    }).subscribe(
      (response) => {
        console.log('Registration successful', response);
      }
    );
  }
}
