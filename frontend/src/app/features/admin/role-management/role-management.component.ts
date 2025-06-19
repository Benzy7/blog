import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-role-management',
  standalone: false,
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  users: User[] = [];
  loading = true;
  error = '';
  saving = false;
  savingUserId: string | null = null;

  roleOptions = [
    { value: 'reader', label: 'Reader' },
    { value: 'author', label: 'Rédacteur' },
    { value: 'editor', label: 'Éditeur' },
    { value: 'admin', label: 'Lecteur' },
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users: any) => {
        this.users = users.map((u: User) => ({
          ...u,
          originalRole: u.role
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users. Please try again later.';
        this.loading = false;
      }
    });
  }

  updateUserRole(user: User): void {
    if (!user._id || !user.role) return;

    this.saving = true;
    this.savingUserId = user._id;

    this.userService.updateUserRole(user._id, user.role).subscribe({
      next: (updatedUser: any) => {
        const index = this.users.findIndex(u => u._id === updatedUser._id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }

        this.saving = false;
        this.savingUserId = null;
      },
      error: (err) => {
        this.error = 'Failed to update user role. Please try again.';
        this.saving = false;
        this.savingUserId = null;
      }
    });
  }

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'admin': return 'badge-admin';
      case 'editor': return 'badge-editor';
      case 'author': return 'badge-author';
      default: return 'badge-reader';
    }
  }

  getRoleBadgeLabel(role: string): string {
    switch (role) {
      case 'admin': return 'Admin';
      case 'editor': return 'Éditeur';
      case 'author': return 'Rédacteur';
      default: return 'Lecteur';
    }
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }
}
