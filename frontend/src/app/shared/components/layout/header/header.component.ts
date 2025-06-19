import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showDropdown = false;
  currentUser: User | null = null;

  constructor(public auth: AuthService) {
    this.auth.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.auth.logout();
    this.showDropdown = false;
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }
}
