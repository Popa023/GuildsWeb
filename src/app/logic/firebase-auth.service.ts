import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import firebase from 'firebase';
import {User} from '../models/user';
import {CommunicationService} from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(
    private router: Router,
    private communicationService: CommunicationService
  ) {
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    const firebaseConfig = {
      apiKey: 'AIzaSyCyQah4d8QHwQTGaELxu1Se2TTUz1e8w8U',
      authDomain: 'partyhard-de038.firebaseapp.com',
      projectId: 'partyhard-de038',
      storageBucket: 'partyhard-de038.appspot.com',
      messagingSenderId: '568191188178',
      appId: '1:568191188178:web:646f5da24fe338818c810b',
      measurementId: 'G-QQW0V2E8PZ'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
  login(account: User, password: string){
    // tslint:disable-next-line:only-arrow-functions
    firebase.auth().signInWithEmailAndPassword(account.userEmail, password).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    }).then(function() {
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          // User is signed in.
        }
      });
    });
  }
  signup(account: User, password: string){
    const communication = this.communicationService;
    // tslint:disable-next-line:triple-equals
    // const communicationService = this.communicationService;
    // tslint:disable-next-line:triple-equals
    firebase.auth().createUserWithEmailAndPassword(account.userEmail, password)
      .then((user) => {
        // Signed in
        // ...
        if (user) {
          // User is signed in.
          if (user.user) {
            account.userToken = user.user.uid;
            communication.addUser(account).subscribe();
          }
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });
  }
  logout() {
    // tslint:disable-next-line:only-arrow-functions
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      // tslint:disable-next-line:only-arrow-functions
    }).catch(function(error) {
      // An error happened.
    });
  }

  getUser(){
    // tslint:disable-next-line:only-arrow-functions
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        // User is signed in.
        this.router.navigate(['/main-page']);
        return user.uid;
      } else {
        // No user is signed in.
        this.router.navigate(['/login']);
        return 'nimic';
      }
    });
  }
  getCurrentUser() {
    return firebase.auth().currentUser;
  }
}
