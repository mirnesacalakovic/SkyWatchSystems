import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../_models/user/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { response } from 'express';
import { map } from 'rxjs';
import { AlarmService } from './alarm.service';
import { debug, error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;
  currentUser: WritableSignal<User | null> = signal(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private alarmService: AlarmService,
    private toastr: ToastrService
  ) {}

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'Account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          if (user.roles.includes('Admin'))
            this.router.navigate(['/admin/dashboard']);
          if (user.roles.includes('Tech'))
            this.router.navigate(['/technical/dashboard']);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['']);
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'Account/register', model).pipe(
      map((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    this.router.navigate(['']);
    console.log(user);
    this.alarmService.loadAlarms(user.id);
  }
}
