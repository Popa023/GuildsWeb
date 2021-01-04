export class User {
  id: number;
  userName: string;
  userToken: string;
  userEmail: string;
  userType: string;
  userRating: number;
  userReviews: number;
  constructor(id: number, name: string, token: string, email: string, userType: string, rating: number, reviews: number) {
    this.id = id;
    this.userName = name;
    this.userToken = token;
    this.userEmail = email;
    this.userType = userType;
    this.userRating = rating;
    this.userReviews = reviews;
  }
}
