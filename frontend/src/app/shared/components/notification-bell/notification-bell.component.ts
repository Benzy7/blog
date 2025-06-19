import { Component } from '@angular/core';
import { SocketService } from '../../../core/services/socket.service';

@Component({
  selector: 'app-notification-bell',
  standalone: false,
  templateUrl: './notification-bell.component.html',
  styleUrl: './notification-bell.component.css'
})
export class NotificationBellComponent {
  showPanel = false;
  unreadCount = 0;
  notifications: any[] = [];

  constructor(private socketService: SocketService) {
    this.socketService.getNotifications().subscribe(notification => {
      if (notification) {
        this.notifications.unshift(notification);
      }
    });

    this.socketService.unreadCount.subscribe(count => {
      this.unreadCount = count;
    });
  }

  togglePanel() {
    this.showPanel = !this.showPanel;
    if (!this.showPanel) {
      this.markAsRead();
    }
  }

  markAsRead() {
    this.socketService.markAsRead();
  }
}

