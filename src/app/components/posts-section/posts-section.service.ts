import { inject, Injectable } from '@angular/core';
import { ConnectFirebase } from '../../services/firebaseConnection.service';
import { tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsSectionService {
  private readonly _initService = inject(ConnectFirebase);
  constructor() {}

  getPosts(): Observable<[]> {
    return this._initService.getPosts().pipe(tap(console.log));
  }
  deletePost(id: string): Observable<[]> {
    return this._initService.deletePost(id).pipe(tap(console.log));
  }
}
