import { Injectable, inject } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { UserData } from "../components/register/user-register.interface";
@Injectable({ providedIn: 'root' })
export class AuthCheck {
  _localStService = inject(LocalStorageService);
  localStorageAcc!: string | null;
  account!: UserData;
  isLogged(): boolean{
    this.localStorageAcc = this._localStService.getItem('profile');
    if (!this.localStorageAcc) return false;
    this.account = JSON.parse(this.localStorageAcc);
    return !!this.account;
  }
}
