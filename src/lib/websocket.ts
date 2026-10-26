export const liveNotificationService = {
  on: (_event: string, _handler: (...args: unknown[]) => void) => undefined,
  emit: (_event: string, _payload?: unknown) => undefined,
};

export class LiveNotificationService {
  private listeners = new Map<string, Array<(...args: unknown[]) => void>>();

  on(event: string, callback: (...args: unknown[]) => void) {
    const list = this.listeners.get(event) ?? [];
    this.listeners.set(event, [...list, callback]);
  }

  emit(event: string, payload?: unknown) {
    const list = this.listeners.get(event) ?? [];
    list.forEach((cb) => cb(payload));
  }
}
