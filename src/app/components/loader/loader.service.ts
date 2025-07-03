import { Injectable, signal, WritableSignal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _isLoading: WritableSignal<boolean> = signal(false);
  isLoading: Signal<boolean> = this._isLoading.asReadonly();

  show() {
    this._isLoading.set(true);
  }

  hide() {
      this._isLoading.set(false);
  }
}
