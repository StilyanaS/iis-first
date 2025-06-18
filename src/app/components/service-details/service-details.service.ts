import { inject, Injectable } from '@angular/core';
import { ConnectFirebase } from '../../services/firebaseConnection.service';
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
