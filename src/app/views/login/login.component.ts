import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {LoginFormControl} from '../../utils/login-form-control';
import {FirebaseAuthService} from '../../logic/firebase-auth.service';
import {CommunicationService} from '../../logic/communication.service';

interface UserTypes {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User(10000,  '', '', '', 'normal', 0, 0);
  password: any;
  emailFormControl: any = LoginFormControl.emailFormControl;
  nameFormControl: any = LoginFormControl.nameFormControl;
  passwordFormControl: any = LoginFormControl.passwordFormControl;
  userTypes: UserTypes[] = [
    {value: 'normal', viewValue: 'Normal'},
    {value: 'organizer', viewValue: 'Organizator'},
    {value: 'quest', viewValue: 'Invitat'}
  ];
  login = true;
  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private communicationService: CommunicationService,
  ) { }

  ngOnInit(): void {
    this.communicationService.getUsers();
    this.getUser();
  }
  logIn(){
    if(!this.emailFormControl.valid){
      alert('Email-ul este introdus gresit');
      return;
    }
    if(!this.passwordFormControl.valid){
      alert('Parola este introdusa gresit');
      return;
    }
    this.firebaseAuthService.login(this.user, this.password);
  }
  signup(){
    if(!this.emailFormControl.valid){
      alert('Email-ul este introdus gresit');
      return;
    }
    if(!this.nameFormControl.valid){
      alert('Numele de utilizator este introdus gresit');
      return;
    }
    if(!this.passwordFormControl.valid){
      alert('Parola este introdusa gresit');
      return;
    }
    this.firebaseAuthService.signup(this.user, this.password);
  }
  getUser(){
    this.firebaseAuthService.getUser();
  }
}
