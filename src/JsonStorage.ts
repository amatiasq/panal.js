export class JsonStorage<T> {
  constructor(public readonly key: string) {}

  read() {
    const stored = localStorage.getItem(this.key);
    return stored ? (JSON.parse(stored) as T) : null;
  }

  write(value: T | null | undefined) {
    if (!value) {
      this.clear();
      return;
    }

    const json = JSON.stringify(value);
    localStorage.setItem(this.key, json);
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
