import { User } from './user.model';

export interface ArticleComment {
  _id?: string;
  content: string;
  author: User;
  parent?: string;
  article: string;
  replies?: ArticleComment[];
  createdAt?: Date;
}
