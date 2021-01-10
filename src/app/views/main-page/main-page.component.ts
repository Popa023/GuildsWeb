import { Component, OnInit } from '@angular/core';
import {CommunicationService} from '../../logic/communication.service';
import {FirebaseAuthService} from '../../logic/firebase-auth.service';
import {UserSession} from '../../utils/user-session';
import {PvpRoom} from '../../models/pvp-room';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';

export class PeriodicElement {
  id: number;
  name: string;
  playerName: string;
  constructor(id: number, name: string, playerName: string) {
    this.id = id;
    this.name = name;
    this.playerName = playerName;
  }
}
const ELEMENT_DATA: PeriodicElement[] = [
  new PeriodicElement(10000, 'Loading', 'Loading')
];

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  rName: any;
  displayedColumns: string[] = ['name', 'playerName', 'button'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(
    private router: Router,
    private firebaseAuthService: FirebaseAuthService,
    private communicationService: CommunicationService,
    public userSession: UserSession
  ) { }

  ngOnInit(): void {
    if (this.userSession.getUser().id == '') {
      this.firebaseAuthService.getUser();
    }
  }

  logout(): void{
    this.firebaseAuthService.logout();
  }
  getRooms(): void{
    this.communicationService.getPvpRooms().subscribe((data) => this.loadPvpRooms(data));
  }
  loadPvpRooms(data: PvpRoom[]): void{
    const updateData: PeriodicElement[] = [];
    for (const room of data){
      updateData.push(new PeriodicElement(room.id, room.rname, room.rfirstplayer.uname));
    }
    this.dataSource.data = updateData;
    this.userSession.updatePvpRooms(data);
  }
  createPvpRoom(): void{
    const pvpRoom: PvpRoom =  new PvpRoom(1000, this.rName, this.userSession.getUser(), this.userSession.getUser(),
      0, false, false, false);
    this.communicationService.addPvpRoom(pvpRoom).subscribe((data) => this.updateGame(data));
    console.log(this.userSession.getGame());
    this.router.navigate(['/game']);
  }
  joinRoom(id: number): void{
    let pvpRoom: any;
    for (const e of UserSession.currentPvPRooms){
      if (e.id == id){
        pvpRoom = e;
      }
    }
    pvpRoom.rsecondplayer = UserSession.currentUser;
    this.communicationService.addPvpRoom(pvpRoom).subscribe((data) => this.updateGame(data));
    this.router.navigate(['/game']);
    console.log(pvpRoom);
  }
  updateGame(data: PvpRoom): void{
    console.log('in updateGame');
    console.log(data);
    this.userSession.updateCurrentGame(data);
  }
}
