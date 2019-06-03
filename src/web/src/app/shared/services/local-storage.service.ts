import { Injectable } from "@angular/core";
@Injectable({ providedIn: "root" })
export class LocalStorageService {
  private readonly itemPrefix = "tapiodeveloperapp.";
  public get<T>(name: string): T {
    const item = localStorage.getItem(this.itemPrefix + name);

    if (item == null || item === "null" || item === "undefined") {
      return null;
    }
    return JSON.parse(item);
  }
  public set<T>(name: string, value: T) {
    localStorage.setItem(this.itemPrefix + name, JSON.stringify(value));
  }
  public remove(name: string) {
    localStorage.removeItem(this.itemPrefix + name);
  }
}
