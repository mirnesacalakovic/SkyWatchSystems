import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { LoginDto } from '../../_dtos/loginDto';
import { User } from '../../_models/user/user';
import { RegisterDto } from '../../_dtos/registerDto';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    NgFor
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  validationErrors: string[] | undefined;

  constructor(private authService: AuthService) {}

  registrationForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.matchValues('password')
    ])
  
});  

get username() { return this.registrationForm.get('username'); }
get email() { return this.registrationForm.get('email'); }
get password() { return this.registrationForm.get('password'); }
get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { notMatching: true }
    }
  }

  register() {
    const registrationData: RegisterDto = {
      username: this.username?.value ?? '',
      email: this.email?.value ?? '',
      password: this.password?.value ?? ''
    };

    this.authService.register(registrationData).subscribe({
      next: () => {
        console.log('Register successful');
      },
      error: (err) => {
        console.log(err);
        this.validationErrors = err;
      }
    })
  }
}
