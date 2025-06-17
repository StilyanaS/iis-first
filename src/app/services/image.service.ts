import { Injectable } from '@angular/core';
import { from, forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Storage, ref, getDownloadURL, listAll } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class ImageService {
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
}