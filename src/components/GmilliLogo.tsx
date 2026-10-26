export class LiveNotificationService {
  private listeners = new Map<string, Array<(...args: unknown[]) => void>>();

  on(event: string, callback: (...args: unknown[]) => void) {
    const eventListeners = this.listeners.get(event) ?? [];
    this.listeners.set(event, [...eventListeners, callback]);
  }

  off(event: string, callback: (...args: unknown[]) => void) {
    const eventListeners = this.listeners.get(event) ?? [];
    this.listeners.set(
      event,
      eventListeners.filter((listener) => listener !== callback),
    );
  }

  emit(event: string, payload?: unknown) {
    const eventListeners = this.listeners.get(event) ?? [];
    eventListeners.forEach((callback) => callback(payload));
  }
}

export const liveNotificationService = new LiveNotificationService();

export interface NotificationMessage {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
}

export function createMockNotification(message: string, type: NotificationMessage['type'] = 'info'): NotificationMessage {
  return {
    id: `notification-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    message,
    type,
    timestamp: new Date().toISOString(),
  };
}
