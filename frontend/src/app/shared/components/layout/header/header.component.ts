import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showDropdown = false;

  constructor(public auth: AuthService) {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.auth.logout();
    this.showDropdown = false;
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }
}
