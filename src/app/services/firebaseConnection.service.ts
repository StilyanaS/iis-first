import { Injectable, inject } from "@angular/core";
import { Firestore, collectionData, addDoc, collection } from "@angular/fire/firestore";
import { catchError, from, map, Observable, tap } from "rxjs";
import { PostsService } from "../components/posts-section/posts-section.interface";
import { UserData } from "../components/register/user-register.interface";
import { CollectionReference, deleteDoc, doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import { ServiceDetails } from "../components/service-details/service-details.interface";
import { SectionService } from "../components/service-section/section-service.interface";
import { PostService } from "../components/single-post/single-post.interface";
@Injectable({ providedIn: 'root' })
export class ConnectFirebase {
  firestore = inject(Firestore);
  servicesDb = collection(
    this.firestore,
    'services'
  ) as CollectionReference<ServiceDetails>;
  postsDb = collection(
    this.firestore,
    'posts'
  ) as CollectionReference<PostService>;
  usersDb = collection(this.firestore, 'users') as CollectionReference<
    UserData,
    DocumentData
  >;
  contactsDb = collection(this.firestore, 'contacts') as CollectionReference<{
    email: string;
  }>;
  serviceDetailsDb = collection(
    this.firestore,
    'services-description'
  ) as CollectionReference<ServiceDetails>;
  calendarRequestsDb = collection(this.firestore, 'valendar-requests');

  getServices(): Observable<SectionService[]> {
    return collectionData(this.servicesDb, {
      idField: 'id',
    });
  }
  getPosts(): Observable<PostService[]> {
    return collectionData(this.postsDb, {
      idField: 'id',
    });
  }

  getPost(id: string): Observable<PostService | undefined> {
    let post = doc(this.postsDb, id);
    return from(getDoc(post)).pipe(
      tap((docSnap) => console.log('Post doc data:', docSnap.data())),
      map((docSnap) =>
        docSnap.exists()
          ? ({ id: docSnap.id, ...docSnap.data() } as PostService)
          : undefined
      ),
      catchError((err) => {
        console.error('Post cannot be found', err);
        throw err;
      })
    );
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

  updatePost(data: PostService) {
    const { id, ...postData } = data;
    let post = doc(this.postsDb, id);
    return from(updateDoc(post, postData)).pipe(
      tap((docRef) => console.log('Post updated:', docRef)),
      catchError((err) => {
        console.error('Post is not updated:', err);
        throw err;
      })
    );
  }

  deletePost(id: string) {
    let post = doc(this.postsDb, id);
    return from(deleteDoc(post)).pipe(
      tap((docRef) => console.log('post was deleted:', docRef)),
      catchError((err) => {
        throw err;
      })
    );
  }

  getUsers(): Observable<UserData[]> {
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
        console.error('User was not deleted:', err);
        throw err;
      })
    );
  }
  updateUser(data: UserData) {
    // Remove id from the update payload
    const { id, ...userData } = data;

    let user = doc(this.usersDb, id);
    return from(updateDoc(user, userData)).pipe(
      tap((docRef) => console.log('User updated:', docRef)),
      catchError((err) => {
        console.error('User is not updated:', err);
        throw err;
      })
    );
  }

  setContact(data: { email: string }) {
    const contactData = {
      email: data.email,
      createdAt: new Date(),
      // Add other fields as needed
    };
    return from(addDoc(this.contactsDb, contactData)).pipe(
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

  reserveSlot(data: {
    name: string;
    email: string;
    dateStart: string;
    hour: string;
  }) {
    return from(addDoc(this.calendarRequestsDb, data)).pipe(
      tap((docRef) => console.log('Request created', docRef.id)),
      catchError((err) => {
        console.error('Request is not created:', err);
        throw err;
      })
    );
  }
}
