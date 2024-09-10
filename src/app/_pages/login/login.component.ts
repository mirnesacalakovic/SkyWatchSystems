import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocationService } from '../../_services/location.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { LoginDto } from '../../_dtos/loginDto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  validationErrors: string[] | undefined;
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });


  constructor(private authService: AuthService, public locationService: LocationService,) {}


  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }


  login() {
    console.log(this.email?.value);
    console.log(this.password?.value);

    if(this.email?.value == null || this.password?.value == null) return;
    const loginCreds: LoginDto = {
      email: this.email.value,
      password: this.password.value
    };

    this.authService.login(loginCreds).subscribe({
      next: _ => {
        console.log('Login successful');
      },
      error: err => {
        console.log(err);
        this.validationErrors = err;
      }

    })
  }
}
