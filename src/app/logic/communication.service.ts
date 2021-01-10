import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PvpRoom} from '../models/pvp-room';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  constructor(private http: HttpClient) {
  }

  configUrl = 'http://localhost:8080/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getPvpRoom(id: number): Observable<PvpRoom>{
    return this.http.get<PvpRoom>(this.configUrl + 'rooms/get?id=' + id, this.httpOptions);
  }
  getPvpRooms(): Observable<PvpRoom[]>{
    return this.http.get<PvpRoom[]>(this.configUrl + 'rooms/getAll', this.httpOptions);
  }
  addPvpRoom(pvpRoom: PvpRoom): Observable<PvpRoom> {
    return this.http.post<PvpRoom>(this.configUrl + 'rooms/post', pvpRoom);
  }
  startPvpRoom(roomId: number): Observable<PvpRoom> {
    return this.http.get<PvpRoom>(this.configUrl + 'rooms/start?roomId=' + roomId);
  }
  actionPvpRoom(roomId: number, initiatorId: string, targetId: string, actionType: string): Observable<PvpRoom>{
    return this.http.get<PvpRoom>(this.configUrl + 'rooms/action?roomId=' + roomId + '&initiatorId=' + initiatorId +
    '&targetId=' + targetId + '&actionType=' + actionType);
  }
  endTurnPvpRoom(roomId: number, id: string): Observable<PvpRoom>{
    return this.http.get<PvpRoom>(this.configUrl + 'rooms/endTurn?roomId=' + roomId + '&userId=' + id);
  }
  endGamePvpRoom(roomId: number): Observable<PvpRoom>{
    return this.http.get<PvpRoom>(this.configUrl + 'rooms/endGame?roomId=' + roomId);
  }
  finishGamePvpRoom(roomId: number): Observable<PvpRoom>{
    return this.http.get<PvpRoom>(this.configUrl + 'rooms/finishGame?roomId=' + roomId);
  }
  deletePvpRoom(id: number): Observable<{}> {
    const url = `${this.configUrl + 'rooms/delete'}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.configUrl + 'users/getAll', this.httpOptions);
  }
  getUser(id: string): Observable<User>{
    return this.http.get<User>(this.configUrl + 'users/get?id=' + id, this.httpOptions);
  }
  addUser(user: User): Observable<User>{
    console.log(user);
    return this.http.post<User>(this.configUrl + 'users/post', user);
  }

  deleteUser(id: number): Observable<{}> {
    const url = `${this.configUrl + 'users/delete'}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }
}
