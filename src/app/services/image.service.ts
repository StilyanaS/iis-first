import { Injectable, signal, WritableSignal } from '@angular/core';
import { from, forkJoin, of, Observable } from 'rxjs';
import { catchError, switchMap, finalize } from 'rxjs/operators';
import { Storage, ref, getDownloadURL, listAll } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private _singleImageUrl: WritableSignal<string | undefined> = signal(undefined);
  readonly singleImageUrl = this._singleImageUrl.asReadonly();
  loading: WritableSignal<boolean> = signal(false);
  error: WritableSignal<any> = signal(null);
  constructor(private storage: Storage) {}

  getFolderImages(folderPath: string) {
    const folderRef = ref(this.storage, folderPath);
    return from(listAll(folderRef)).pipe(
      switchMap((result: any) => {
        const downloadUrlObservables = result.items.map((itemRef: any) =>
          from(getDownloadURL(itemRef))
        );
        return forkJoin(downloadUrlObservables);
      }),
      catchError(() => of([]))
    );
  }
  /**
   * Fetches the download URL of an image from Firebase Storage.
   * @param imagePath - The path to the image in Firebase Storage.
   * @returns An Observable that emits the download URL of the image or undefined if an error occurs.
   */
  getImageUrl(imagePath: string): Observable<string | undefined> {
    const imageRef = ref(this.storage, imagePath);
    return from(getDownloadURL(imageRef)).pipe(
      catchError((error) => {
        console.error('Error fetching image URL:', error);
        return from([undefined]); // Emit undefined on error
      })
    );
  }

  loadImageUrl(imagePath: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.getImageUrl(imagePath).pipe(
      finalize(() => this.loading.set(false))
    ).subscribe({
      next: (url) => this._singleImageUrl.set(url),
      error: (err) => {
        this.error.set(err);
      }
    });
  }
}
