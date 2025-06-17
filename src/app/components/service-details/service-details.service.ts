import { inject, Injectable } from '@angular/core';
import { ConnectFirebase } from '../../services/firebaseConnection.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceDetailsService {

  private readonly _initService = inject(ConnectFirebase);
  constructor() {}
  getServiceDetails(): any {
    return this._initService.getServiceDetails()
  }
}
