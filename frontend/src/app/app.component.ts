import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private readonly authService: AuthService) { }

  title = 'Blogy';

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.fetchCurrentUser().subscribe({
        next: user => {},
        error: err => {
          console.error('Failed to fetch user on init:', err);
        }
      });
    }
  }
}
