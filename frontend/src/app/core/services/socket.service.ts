import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Notification {
  message: string;
  type?: string;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket!: Socket;
  private readonly notificationSubject = new BehaviorSubject<Notification | null>(null);
  public unreadCount = new BehaviorSubject<number>(0);

  connect(userId: string, token: string): void {
    console.log('[SocketService] Attempting connection to:', environment.socketUrl);
    console.log('[SocketService] Using credentials - User ID:', userId, 'Token:', token ? 'present' : 'MISSING');

    try {
      this.socket = io(environment.socketUrl, {
        auth: { token },
        query: { userId },
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      this.socket.on('connect', () => {
        console.log('[SocketService] ✅ Connected successfully. Socket ID:', this.socket.id);
      });

      this.socket.on('connect_error', (error) => {
        console.error('[SocketService] ❌ Connection failed:', error.message);
      });

      this.socket.on('disconnect', (reason) => {
        console.warn('[SocketService] 🔌 Disconnected. Reason:', reason);
      });

      this.socket.on('error', (error) => {
        console.error('[SocketService] ⚠️ Socket error:', error);
      });

      this.socket.on('notification', (data) => {
        console.log('[SocketService] 🔔 Notification received:', data);
        const notification = {
          ...data,
          timestamp: data.timestamp || Date.now()
        };
        this.notificationSubject.next(notification);
        this.unreadCount.next(this.unreadCount.value + 1);
        this.playNotificationSound();
      });

    } catch (error) {
      console.error('[SocketService] 🛑 Initialization error:', error);
    }
  }

  getNotifications(): Observable<Notification | null> {
    return this.notificationSubject.asObservable();
  }

  private playNotificationSound() {
    const audio = new Audio('assets/sounds/notification.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.warn('Sound playback failed:', e));
  }

  markAsRead() {
    this.unreadCount.next(0);
  }

  onNotification(): Observable<any> {
    return new Observable((observer) => {
      if (!this.socket) {
        console.error('[SocketService] onNotification called before socket initialization!');
        return;
      }
      this.socket.on('notification', (data) => observer.next(data));
    });
  }

  disconnect(): void {
    if (this.socket) {
      console.log('[SocketService] ⌫ Disconnecting socket');
      this.socket.disconnect();
    }
  }

  getSocketState(): string {
    return this.socket ? this.socket.connected ? 'connected' : 'disconnected' : 'not initialized';
  }
}
