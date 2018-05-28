export class Kweet {
  id: number;
  datePosted: Date;
  postedBy: Account;
  body: string;
  mentions: Account[];
  likedBy: Account[];
}
