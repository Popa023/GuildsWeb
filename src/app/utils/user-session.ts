import {User} from '../models/user';
import {Warehouse} from '../models/warehouse';
import {Character} from '../models/character';
import {Item} from '../models/item';
import {Consumable} from '../models/consumable';
import {PvpRoom} from '../models/pvp-room';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserSession {

  constructor() {}

  static currentUser: User;
  static currentGame: PvpRoom;
  static currentPvPRooms: PvpRoom[];

  init(): void{
    UserSession.currentUser = new User('', '', '', '', 0,
      0, new Warehouse(10000, 0, 0, 0, 0),
      new Character(100000, 0, 0, 0, 0, 0, 0,
        0, new Item(10000, '', 0, 0, 0, 0),
        new Item(10000, '', 0, 0, 0, 0),
        new Consumable(100000, '', 0, 0, 0, 0)));
    UserSession.currentPvPRooms = [];
  }
  updateUser(user: User): void{
    UserSession.currentUser = user;
  }
  getUser(): User{
    return UserSession.currentUser;
  }
  updatePvpRooms(pvpRooms: PvpRoom[]): void{
    UserSession.currentPvPRooms = pvpRooms;
  }
  updateCurrentGame(pvpRoom: PvpRoom): void {
      UserSession.currentGame = pvpRoom;
  }
  getGame(): PvpRoom{
    return UserSession.currentGame;
  }
}
