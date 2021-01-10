import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseAuthService} from '../../logic/firebase-auth.service';
import {CommunicationService} from '../../logic/communication.service';
import {UserSession} from '../../utils/user-session';
import {PvpRoom} from '../../models/pvp-room';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    private router: Router,
    private firebaseAuthService: FirebaseAuthService,
    private communicationService: CommunicationService,
    public userSession: UserSession
  ) { }

  ngOnInit(): void {
  }

  startGame(): void{
    this.communicationService.getPvpRoom(this.userSession.getGame().id).subscribe((data) => this.updateGame(data));
    this.communicationService.startPvpRoom(this.userSession.getGame().id).subscribe((data) => this.updateGame(data));
  }
  updateGame(data: PvpRoom): void{
    this.userSession.updateCurrentGame(data);
    console.log(this.userSession.getGame());
  }
  actionGame(action: string): void{
    console.log('action');
    console.log(this.userSession.getUser());
    console.log(this.userSession.getGame());
    if ( action == 'potion') {
      if ( this.userSession.getUser().id == this.userSession.getGame().rfirstplayer.id) {
        this.communicationService.actionPvpRoom(this.userSession.getGame().id,
          this.userSession.getGame().rfirstplayer.id, this.userSession.getGame().rfirstplayer.id,
          action).subscribe((data) => this.updateGame(data));
      }
      else {
        this.communicationService.actionPvpRoom(this.userSession.getGame().id,
          this.userSession.getGame().rsecondplayer.id, this.userSession.getGame().rsecondplayer.id,
          action).subscribe((data) => this.updateGame(data));
      }
    }
    if ( this.userSession.getUser().id == this.userSession.getGame().rfirstplayer.id) {
      this.communicationService.actionPvpRoom(this.userSession.getGame().id,
        this.userSession.getGame().rfirstplayer.id, this.userSession.getGame().rsecondplayer.id,
        action).subscribe((data) => this.updateGame(data));
    }
    else {
      this.communicationService.actionPvpRoom(this.userSession.getGame().id,
        this.userSession.getGame().rsecondplayer.id, this.userSession.getGame().rfirstplayer.id,
        action).subscribe((data) => this.updateGame(data));
    }
  }
  endTurn(): void{
    this.communicationService.endTurnPvpRoom(this.userSession.getGame().id, this.userSession.getUser().id).subscribe((data) => this.updateGame(data));
  }
  endGame(): void{
    this.communicationService.endGamePvpRoom(this.userSession.getGame().id).subscribe((data) => this.updateGame(data));
  }
  finishGame(): void{
    this.communicationService.finishGamePvpRoom(this.userSession.getGame().id).subscribe((data) => this.updateGame(data));
  }
}
