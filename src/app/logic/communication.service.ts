import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from '../models/Event';
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

  getEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(this.configUrl + 'events/getAll', this.httpOptions);
  }
  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.configUrl + 'events/post', event);
  }

  deleteEvent(id: number): Observable<{}> {
    const url = `${this.configUrl + 'events/delete'}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.configUrl + 'users/getAll', this.httpOptions);
  }
  addUser(event: User): Observable<User>{
    return this.http.post<User>(this.configUrl + 'users/post', event);
  }

  deleteUser(id: number): Observable<{}> {
    const url = `${this.configUrl + 'users/delete'}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }
}
