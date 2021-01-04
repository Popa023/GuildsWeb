import {Component, OnInit} from '@angular/core';
import {FirebaseAuthService} from '../../logic/firebase-auth.service';
import {CommunicationService} from '../../logic/communication.service';
import {User} from '../../models/user';
import {Event} from '../../models/Event';
import {Review} from '../../models/review';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';

interface SearchType {
  value: string;
  viewValue: string;
}

export class PeriodicElement {
  id: number;
  name: string;
  organizerName: string;
  eventType: string;
  guests: string;
  grade: number;
  review: number;
  constructor(id: number, name: string, organizerName: string, eventType: string, guests: string, grade: number, review: number) {
    this.id = id;
    this.name = name;
    this.organizerName = organizerName;
    this.eventType = eventType;
    this.guests = guests;
    this.grade = grade;
    this.review = review;
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  new PeriodicElement(10000, 'Loading', 'Loading', 'Loading', 'Loading', 0, 0)
];
const FILTERED_DATA: PeriodicElement[] = [
  new PeriodicElement(10000, 'Loading', 'Loading', 'Loading', 'Loading', 0, 0)
];
const FINAL_Data: PeriodicElement[] = [
  new PeriodicElement(10000, 'Loading', 'Loading', 'Loading', 'Loading', 0, 0)
];
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  userTypes: SearchType[] = [
    {value: 'organizer', viewValue: 'Organizator'},
    {value: 'guest', viewValue: 'Invitat'},
    {value: 'eventType', viewValue: 'Tipul de Eveniment'},
    {value: 'minGrade', viewValue: 'Nota Minima'}
  ];
  eventTypeSearch: string[] = [];
  typeSearch: any;
  uid: any;
  displayedColumns: string[] = ['name', 'organizerName', 'eventType', 'guests', 'grade', 'buttons'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  currentUsers: User[] = [];
  currentEvents: Event[] = [];
  currentUser: User = new User(1000, '', '', '', '', 0, 0);
  newName: any;
  newOrg: any;
  newType: any;
  newGuests: any;
  search: any;
  searchType: any = 'organizer';
  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private communicationService: CommunicationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.uid = this.firebaseAuthService.getCurrentUser()?.uid;
    this.communicationService.getUsers().subscribe((data) => this.loadUsers(data));
    this.communicationService.getEvents().subscribe((data) => this.loadEvents(data));
  }
  logout(){
    this.firebaseAuthService.logout();
  }
  loadUsers(data: User[]) {
    console.log('loadUsers');
    console.log(this.uid);
    this.currentEvents = [];
    for (const value of data) {
      this.currentUsers.push(value);
      if (this.uid == value.userToken){
        this.currentUser = value;
      }
    }
    console.log(this.currentUsers);
    console.log(this.currentUser);
    if(this.currentUser.userName == '') {
      this.router.navigate(['/login']);
    }
  }
  loadEvents(data: Event[]) {
    console.log(data);
    console.log('loadEvents');
    for (const value of data) {
      this.currentEvents.push(value);
      var count = 0;
      for (const e of this.eventTypeSearch){
        if(e == value.eventType){
          count++;
        }
      }
      if (count == 0){
        this.eventTypeSearch.push(value.eventType);
      }
    }
    console.log(this.currentEvents);
    if(data.length < this.currentEvents.length){
      this.router.navigate(['/login']);
    }
    this.loadTable();
  }
  loadTable() {
    console.log('loadTable');
    while (ELEMENT_DATA.length > 0){
      ELEMENT_DATA.pop();
    }
    for (const e of this.currentEvents) {
      const first = this.currentEvents.indexOf(e);
      console.log(first);
      const last = this.currentEvents.lastIndexOf(e);
      console.log(last);
      if(last != first) {
        this.router.navigate(['/login']);
      }
      console.log(e);
      let guests = '';
      for(const g of e.eventGuests){
        guests = guests + g.userName;
      }
      let grade = 0;
      let rev = 0;
      for(const r of e.eventReviews){
        grade = grade + r.grade;
        if (r.reviewer.id == this.currentUser.id){
          rev = r.grade;
        }
      }
      ELEMENT_DATA.push(new PeriodicElement(e.id, e.eventName, e.eventOrganizer.userName,
        e.eventType, guests, grade / e.eventReviews.length, rev));
    }
    for (const value of ELEMENT_DATA) {
      var count = 0;
      for (const e of FINAL_Data){
        if(e == value){
          count++;
        }
      }
      if (count == 0){
        FINAL_Data.push(value);
      }
    }
    this.dataSource.data = [];
    this.dataSource.data = ELEMENT_DATA;
  }
  rateEvent(element: PeriodicElement, review: number) {
    for(const pEvent of this.currentEvents){
      console.log(pEvent);
      console.log(element);
      console.log('review to update will');
      if(pEvent.id == element.id){
        for(const rev of pEvent.eventReviews){
          console.log(rev);
          console.log('review to update');
          if(rev.reviewer.id == this.currentUser.id){
            rev.grade = review;
            this.communicationService.addEvent(pEvent).subscribe();
            this.communicationService.getEvents().subscribe((data) => this.loadEvents(data));
            console.log('review updated');
            break;
          }
          else {
            pEvent.eventReviews.push(new Review(10000, this.currentUser, review));
            this.communicationService.addEvent(pEvent).subscribe();
            this.communicationService.getEvents().subscribe((data) => this.loadEvents(data));
            console.log('review created');
            break;
          }
        }
      }
    }
  }
  addEvent(){
    console.log('addEvent');
    const guests: User[] = [];
    let gues: User;
    for (const g of this.currentUsers){
      if (g.userEmail == this.newGuests){
        gues = g;
        guests.push(gues);
      }
    }
    const reviews: Review[] = [];
    reviews.push(new Review(10000, this.currentUser, 5));
    const newEvent = new Event(1000, this.newName, this.currentUser, this.newType, guests, reviews);
    this.communicationService.addEvent(newEvent).subscribe();
    this.communicationService.getEvents().subscribe((data) => this.loadEvents(data));
    console.log(newEvent);
  }
  filter() {
    switch (this.searchType) {
      case 'organizer': {
        while (FILTERED_DATA.length > 0){
          FILTERED_DATA.pop();
        }
        for(const e of ELEMENT_DATA){
          if (e.organizerName == this.search){
            FILTERED_DATA.push(e);
          }
          this.dataSource.data = FILTERED_DATA;
        }
        break;
      }
      case 'guest': {
        while (FILTERED_DATA.length > 0){
          FILTERED_DATA.pop();
        }
        for(const e of ELEMENT_DATA){
          if (e.guests == this.search){
            FILTERED_DATA.push(e);
          }
          this.dataSource.data = FILTERED_DATA;
        }
        break;
      }
      case 'eventType': {
        console.log('eventTypeSearch');
        while (FILTERED_DATA.length > 0){
          FILTERED_DATA.pop();
        }
        for(const e of ELEMENT_DATA){
          console.log(e.eventType + ' ' + this.typeSearch);
          if (e.eventType == this.typeSearch){
            FILTERED_DATA.push(e);
          }
          this.dataSource.data = FILTERED_DATA;
        }
        break;
      }
      case 'minGrade': {
        while (FILTERED_DATA.length > 0){
          FILTERED_DATA.pop();
        }
        for(const e of ELEMENT_DATA){
          if (e.grade >= this.search){
            FILTERED_DATA.push(e);
          }
          this.dataSource.data = FILTERED_DATA;
        }
        break;
      }
    }
  }
}
