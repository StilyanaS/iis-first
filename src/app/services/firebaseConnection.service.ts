import { Injectable, inject } from "@angular/core";
import { Firestore, collectionData, addDoc, collection } from "@angular/fire/firestore";
import { catchError, from, Observable, tap } from "rxjs";
import { PostsService } from "../components/posts-section/posts-section.interface";
import { UserData } from "../components/register/user-register.interface";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
@Injectable({ providedIn: 'root' })
export class ConnectFirebase {
  firestore = inject(Firestore);
  servicesDb = collection(this.firestore, 'services');
  postsDb = collection(this.firestore, 'posts');
  usersDb = collection(this.firestore, 'users');
  contactsDb = collection(this.firestore, 'contacts');
  serviceDetailsDb = collection(this.firestore, 'services-description');
  calendarRequestsDb = collection(this.firestore, 'valendar-requests');

  getServices(): Observable<any> {
    return collectionData(this.servicesDb, {
      idField: 'id',
    });
  }
  getPosts(): Observable<any> {
    return collectionData(this.postsDb, {
      idField: 'id',
    });
  }
  setPost(data: PostsService) {
    return from(addDoc(this.postsDb, data)).pipe(
      tap((docRef) => console.log()),
      catchError((err) => {
        console.log('post was not created', err);
        throw err;
      })
    );
  }

  getUsers(): Observable<any> {
    return collectionData(this.usersDb, {
      idField: 'id',
    });
  }

  createUser(data: UserData) {
    return from(addDoc(this.usersDb, data)).pipe(
      tap((docRef) => console.log('User with ID:', docRef.id)),
      catchError((err) => {
        console.error('User is not created:', err);
        throw err;
      })
    );
  }
  deleteUser(data: UserData) {
    let user = doc(this.usersDb, data.id);
    return from(deleteDoc(user)).pipe(
      tap((docRef) => console.log('User with ID:', docRef)),
      catchError((err) => {
        console.error('User is not created:', err);
        throw err;
      })
    );
  }
  updateUser(data: any) {
    let user = doc(this.usersDb, data.id);
    return from(updateDoc(user, data)).pipe(
      tap((docRef) => console.log('User updated:', docRef)),
      catchError((err) => {
        console.error('User is not updated:', err);
        throw err;
      })
    );
  }

  setContact(data: any) {
    return from(addDoc(this.contactsDb, data)).pipe(
      tap((docRef) => console.log('Contact with ID:', docRef.id)),
      catchError((err) => {
        console.error('Contact is not created:', err);
        throw err;
      })
    );
  }

  getServiceDetails() {
    return collectionData(this.serviceDetailsDb, {
      idField: 'id',
    }).pipe(
      catchError((err) => {
        console.error('Error fetching service details:', err);
        throw err;
      })
    );
  }

  reserveSlot(data: {name: string, email: string, dateStart: string, hour: string}) {
    return from(addDoc(this.calendarRequestsDb, data)).pipe(
      tap((docRef) => console.log('Request created', docRef.id)),
      catchError((err) => {
        console.error('Request is not created:', err);
        throw err;
      })
    );
  }
}
