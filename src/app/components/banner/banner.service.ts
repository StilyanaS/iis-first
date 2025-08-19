import { inject, Injectable } from '@angular/core';
import { ConnectFirebase } from '../../services/firebaseConnection.service';
import { tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private readonly _initService = inject(ConnectFirebase);
  constructor() {}

  saveContant(email: string): Observable<[]> {
    return this._initService.setContact( {email} ).pipe(tap(console.log));
  }
}
