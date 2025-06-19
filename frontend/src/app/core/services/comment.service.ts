import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleComment } from '../models/article-comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = environment.apiUrls.article;

  constructor(private readonly http: HttpClient) { }

  getCommentsByArticle(articleId: string): Observable<ArticleComment[]> {
    return this.http.get<ArticleComment[]>(`${this.apiUrl}/${articleId}/comments/`);
  }

  createComment(articleId: string, content: string, parent: string | null = null): Observable<ArticleComment> {
    return this.http.post<ArticleComment>(`${this.apiUrl}/${articleId}/comments/`, {
      article: articleId,
      content,
      parent
    });
  }
}
