import { inject, Injectable } from '@angular/core';
import { ConnectFirebase } from '../../services/firebaseConnection.service';
import { tap, Observable } from 'rxjs';
import { PostService } from '../../components/single-post/single-post.interface';

@Injectable({
  providedIn: 'root',
})
export class updatePostService {
  private readonly _initService = inject(ConnectFirebase);
  constructor() {}

  getPost(id: string): Observable<[]> {
    return this._initService.getPost( id ).pipe(tap(console.log));
  }
  updatePost(id: string, postData: PostService): Observable<[]> {
    const post = {id, ...postData}
    return this._initService.updatePost( post ).pipe(tap(console.log));
  }
}
