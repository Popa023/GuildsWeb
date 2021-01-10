import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import firebase from 'firebase';
import {User} from '../models/user';
import {CommunicationService} from './communication.service';
import {UserSession} from '../utils/user-session';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(
    private router: Router,
    private communicationService: CommunicationService,
    private userSession: UserSession
  ) {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: 'AIzaSyBO1laqMr67uID91MFH1zXxsDohpb-p16g',
      authDomain: 'guilds-aa30d.firebaseapp.com',
      projectId: 'guilds-aa30d',
      storageBucket: 'guilds-aa30d.appspot.com',
      messagingSenderId: '310166906352',
      appId: '1:310166906352:web:b4d8cdeca3a6318edea935',
      measurementId: 'G-L8PRV8BY1H'
    };
    // Initialize Firebase
    userSession.init();
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
  login(account: User, password: string): void{
    // tslint:disable-next-line:only-arrow-functions
    firebase.auth().signInWithEmailAndPassword(account.uemail, password).catch(function(error): void{
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
    this.getUser();
  }
  signup(account: User, password: string): void{
    const communication = this.communicationService;
    // tslint:disable-next-line:triple-equals
    // const communicationService = this.communicationService;
    // tslint:disable-next-line:triple-equals
    firebase.auth().createUserWithEmailAndPassword(account.uemail, password)
      .then((user) => {
        // Signed in
        // ...
        if (user) {
          // User is signed in.
          if (user.user) {
            account.id = user.user.uid;
            communication.addUser(account).subscribe();
          }
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });
    this.getUser();
  }
  logout(): void{
    // tslint:disable-next-line:only-arrow-functions
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.getUser();
    }).catch((error) => {
      // An error happened.
    });
    this.getUser();
  }

  getUser(): void{
    // tslint:disable-next-line:only-arrow-functions
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        // User is signed in.
        console.log('in getUser');
        console.log(user.uid);
        this.communicationService.getUser(user.uid).subscribe((data) => this.loadUser(data));
      } else {
        // No user is signed in.
        this.router.navigate(['/login']);
      }
    });
  }
  loadUser(data: User): void{
    console.log('in loaduser');
    this.userSession.updateUser(data);
    console.log(this.userSession.getUser());
    this.router.navigate(['/main-page']);
  }
}
