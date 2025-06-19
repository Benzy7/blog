import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Article } from '../models/article.model';

interface PaginatedResponse {
  articles: Article[];
  total: number;
  page: number;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly apiUrl = environment.apiUrls.article;

  constructor(private readonly http: HttpClient) { }

  getArticles(page = 1, limit = 9): Observable<Article[]> {
    return this.http
      .get<PaginatedResponse>(`${this.apiUrl}?page=${page}&limit=${limit}`)
      .pipe(map(res => res.articles));
  }


  getArticle(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  createArticle(articleData: any): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, articleData);
  }

  updateArticle(id: string, articleData: any): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${id}`, articleData);
  }

  deleteArticle(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
