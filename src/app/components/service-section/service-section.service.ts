import { inject, Injectable } from '@angular/core';
import { ConnectFirebase } from '../../services/firebaseConnection.service';
import { tap, Observable } from 'rxjs';
import { SectionService } from './section-service.interface';

@Injectable({
  providedIn: 'root',
})
export class ServiceSectionService {
  private readonly _initService = inject(ConnectFirebase);
  constructor() {}

  getServices(): Observable<SectionService[]> {
    return this._initService.getServices();
  }
}
