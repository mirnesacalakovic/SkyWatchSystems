import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { User } from './_models/user/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'SkyWatch';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const userString = localStorage.getItem('user');
      if (!userString) return;
      const user: User = JSON.parse(userString);
      this.authService.setCurrentUser(user);
    }
  }
}
