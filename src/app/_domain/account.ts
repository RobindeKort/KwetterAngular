export class Account {
  id: number;
  userName: string;
  password: string;
  email: string;
  picturePath: string;
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
  website: string;
  followingCount: number;
  followedByCount: number;
  kweetCount: number;

  constructor(userName: string, password: string, email: string) {
    this.id = 1;
    this.userName = userName;
    this.email = email;
    this.password = password;
  }
}
