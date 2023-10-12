import { Injectable } from '@angular/core';
import { FireappService } from './fireapp.service';
import { Auth, User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { OurUser } from '../model/ourUser';
import { FirestoreService } from './firestore.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth: Auth;

  ourUser = new BehaviorSubject<OurUser | null>(null)
  firebaseUser = new BehaviorSubject<User | null>(null);  //User è quello di firebase, non creato da noi

  constructor(private fireApp: FireappService, private firestore: FirestoreService) {
    this.auth = getAuth(fireApp.app);

    onAuthStateChanged(this.auth, (user) => {
      console.log('autenticazione cambiata');
      if (user) {

        const uid = user.uid;
        console.log('user', user);
        this.firebaseUser.next(user);
        this.firestore.getOurUser(uid).then(ourU => {
        this.ourUser.next(ourU.data() as OurUser);
        })
      } else {
        console.log('user non c\'è');
        this.firebaseUser.next(null);
      }
    });
  }


  registerUser(newUser: OurUser,email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        this.firestore.postOurUser(newUser, user.uid).then(() => {this.ourUser.next(newUser)});

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errore di registrazione', error.code, error.message)
      });
  }



  login(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        console.log('login eseguita', user);
        this.firestore.getOurUser(user.uid);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errore di login', error.code, error.message);
      });
  }



  logOut() {
    signOut(this.auth)
      .then(() => {})
      .catch((error) => {

      });
  }
}
