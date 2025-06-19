import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../core/services/article.service';
import { Article } from '../../../core/models/article.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-article-view',
  standalone: false,
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {
  article: Article | null = null;
  loading = true;
  error = '';
  canEdit = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (!articleId) return;

    this.loadArticle(articleId);
  }

  loadArticle(articleId: string): void {
    this.articleService.getArticle(articleId).subscribe({
      next: (article) => {
        this.article = article;
        this.checkEditPermissions(article);
        this.loading = false;
      },
      error: (err) => {
        this.error = "Échec du chargement de l'article";
        this.loading = false;
      }
    });
  }

  checkEditPermissions(article: Article): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.canEdit = false;
      return;
    }

    this.canEdit = user.role === 'admin' ||
    user.role === 'super-admin' ||
      user.role === 'editor' ||
      (user.role === 'author' && article.authorId === user._id);
  }

  getImageUrl(imagePath?: string): string {
    return imagePath
      ? `http://127.0.0.1:3002${imagePath}`
      : '/assets/default-article.jpg'; //TODO
  }
}
