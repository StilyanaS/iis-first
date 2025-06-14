import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();

  show() {
    this.loading.next(true);
  }

  hide() {
      this.loading.next(false);
  }
}
// This service manages the loading state of the application.
// It uses a BehaviorSubject to track whether the application is currently loading.
