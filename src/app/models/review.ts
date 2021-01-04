import {User} from './user';

export class Review {
  id: number;
  reviewer: User;
  grade: number;
  constructor(id: number, reviewer: User, grade: number) {
    this.id = id;
    this.reviewer = reviewer;
    this.grade = grade;
  }
}
