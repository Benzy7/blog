import { User } from './user.model';

export interface Comment {
  _id: string;
  content: string;
  author: User;
  article: string;
  replies: Comment[];
  createdAt: Date;
}
