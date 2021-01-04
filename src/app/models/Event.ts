import {User} from './user';
import {Review} from './review';

export class Event {
  id: number;
  eventName: string;
  eventOrganizer: User;
  eventType: string;
  eventGuests: User[];
  eventReviews: Review[];
  constructor(id: number, name: string, organizer: User, eventType: string, quests: User[], eventReviews: Review[]) {
    this.id = id;
    this.eventName = name;
    this.eventOrganizer = organizer;
    this.eventType = eventType;
    this.eventGuests = quests;
    this.eventReviews = eventReviews;
  }
}
