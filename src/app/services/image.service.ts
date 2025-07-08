import { Injectable } from '@angular/core';
import { from, forkJoin, of, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Storage, ref, getDownloadURL, listAll, ListResult, StorageReference } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class ImageService {
  constructor(private storage: Storage) {}

  getFolderImages(folderPath: string) {
    const folderRef = ref(this.storage, folderPath);
    return from(listAll(folderRef)).pipe(
      switchMap((result: ListResult) => {
        const downloadUrlObservables = result.items.map((itemRef: StorageReference) =>
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
}
