import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {LoginFormControl} from '../../utils/login-form-control';
import {FirebaseAuthService} from '../../logic/firebase-auth.service';
import {CommunicationService} from '../../logic/communication.service';
import {Warehouse} from '../../models/warehouse';
import {Character} from '../../models/character';
import {Item} from '../../models/item';
import {Consumable} from '../../models/consumable';

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
  user: User = new User('', '', '', '', 0,
    0, new Warehouse(10000, 0, 0, 0, 0),
    new Character(100000, 0, 0, 0, 0, 0, 0,
      0, new Item(10000, 'weapon', 1, 1, 1, 0),
      new Item(10000, 'armour', 1, 1, 1, 0),
      new Consumable(100000, 'potion', 1, 1, 1, 0)));
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
  ) { }

  ngOnInit(): void {}
  logIn(): void{
    if (!this.emailFormControl.valid){
      alert('Email-ul este introdus gresit');
      return;
    }
    if (!this.passwordFormControl.valid){
      alert('Parola este introdusa gresit');
      return;
    }
    this.firebaseAuthService.login(this.user, this.password);
  }
  signup(): void{
    if (!this.emailFormControl.valid){
      alert('Email-ul este introdus gresit');
      return;
    }
    if (!this.nameFormControl.valid){
      alert('Numele de utilizator este introdus gresit');
      return;
    }
    if (!this.passwordFormControl.valid){
      alert('Parola este introdusa gresit');
      return;
    }
    this.firebaseAuthService.signup(this.user, this.password);
  }
}
