import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { SocketService } from './core/services/socket.service';
import { User } from './core/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private readonly authService: AuthService, private readonly socketService: SocketService) { }

  title = 'Blogy';

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.fetchCurrentUser().subscribe({
        next: (user: User) => {
          const token = this.authService.getAccessToken();
          this.socketService.connect(user._id!, token!);
          this.socketService.onNotification().subscribe((notif) => {
            console.log('New Notification:', notif);

          });

        },
        error: err => {
          console.error('Failed to fetch user on init:', err);
        }
      });
    }
  }
}
