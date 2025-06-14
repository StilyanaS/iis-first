import { inject, Injectable } from '@angular/core';
import { ConnectFirebase } from '../../services/firebaseConnection.service';
import { tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceSectionService {

  private readonly _initService = inject(ConnectFirebase);
  constructor() {}

  getServices(): Observable<[]> {
    return this._initService.getServices();
  }
}
