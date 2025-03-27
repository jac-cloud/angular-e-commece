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
  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    // Implement form submission logic here
    console.log('Form submitted');

    this.authService.authPost({
      header: {
        // BasicAuth
        Authorization: 'Basic ' + btoa(form.value.email + ':' + form.value.password)
            }
          }).subscribe(
            (response) => {
        console.log('Login successful', response);
        // Save to localstorage response.token
        localStorage.setItem('token', response.token);
      }
    );
  }
}
