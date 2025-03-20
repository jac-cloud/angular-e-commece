import { NgIf } from '@angular/common';
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
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  onSubmit(form: NgForm) {
    console.log('Form submitted', form);
    if (form.value.password !== form.value.confirmPassword) {
      form.controls['confirmPassword'].setErrors({ 'incorrect': true });
      console.log('Passwords do not match');
      return;
    }
    console.log('Form submitted', form.value);
  }
}
