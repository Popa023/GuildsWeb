import {Character} from './character';
import {Warehouse} from './warehouse';
import {User} from './user';

export class PvpRoom {
  id: number;
  rname: string;
  rfirstplayer: User;
  rsecondplayer: User;
  rturn: number;
  rfinished: boolean;
  rdelete: boolean;
  rstartroom: boolean;

  constructor(id: number, rName: string, rFirstPlayer: User, rSecondPlayer: User, rTurn: number, rFinished: boolean,
              rDelete: boolean, rStartRoom: boolean) {
    this.id = id;
    this.rname = rName;
    this.rfirstplayer = rFirstPlayer;
    this.rsecondplayer = rSecondPlayer;
    this.rturn = rTurn;
    this.rfinished = rFinished;
    this.rdelete = rDelete;
    this.rstartroom = rStartRoom;

  }
}
