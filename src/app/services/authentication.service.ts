import { Injectable, inject, signal } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { UserData } from "../components/register/user-register.interface";
@Injectable({ providedIn: 'root' })
export class AuthCheck {
  _localStService = inject(LocalStorageService);
  localStorageAcc!: string | null;
  account!: UserData;
  private loggedIn = signal(false);
  readonly loggedInSignal = this.loggedIn.asReadonly();

  checkLogIn(): boolean {
    this.localStorageAcc = this._localStService.getItem('profile');
    if (!this.localStorageAcc) return false;
    this.account = JSON.parse(this.localStorageAcc);
    return !!this.account;
  }

  get isLoggedIn() {
    if (this.checkLogIn()) {
      this.loggedIn.set(true);
    }
    return this.loggedIn();
  }

  login() {
    this.loggedIn.set(true);
  }

  logout() {
    this.loggedIn.set(false);
  }
}
