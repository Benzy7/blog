import { ArticleComment } from './article-comment.model';
import { User } from './user.model';

export interface Article {
  _id: string;
  title: string;
  content: string;
  image?: string;
  tags: string[];
  authorId: string;
  author: User;
  comments: ArticleComment[] | null;
  createdAt: Date;
  updatedAt: Date;
}
