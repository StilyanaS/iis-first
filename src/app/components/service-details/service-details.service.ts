import { inject, Injectable } from '@angular/core';
import { ConnectFirebase } from '../../services/firebaseConnection.service';
import { Observable } from 'rxjs';
import { ServiceDetails } from './service-details.interface';
@Injectable({
  providedIn: 'root',
})
export class ServiceDetailsService {
  private readonly _initService = inject(ConnectFirebase);
  constructor() {}
  getServiceDetails(): Observable<ServiceDetails[]> {
    console.log('get service details');

    return this._initService.getServiceDetails();
  }
}
