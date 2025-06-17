import { Component, Input } from '@angular/core';
import { Article } from '../../../core/models/article.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-article-card',
  standalone: false,
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent {
  @Input() article: Article|null = null;
  @Input() showActions = false;

  constructor(public authService: AuthService, private router: Router) {}

  canEdit(): boolean {
    if (!this.authService.isLoggedIn()) return false;

    const user = this.authService.getCurrentUser();
    return (
      user!.role === 'admin' ||
      user!.role === 'editor' ||
      (user!.role === 'author' && this.article!.authorId === user!._id)
    );
  }

  canDelete(): boolean {
    return this.authService.isLoggedIn() && this.authService.getCurrentUser()!.role === 'admin';
  }

  editArticle(): void {
    this.router.navigate(['/articles/edit', this.article!._id]);
  }

  deleteArticle(): void {
    if (confirm('Are you sure you want to delete this article?')) {
      // Implement delete functionality in parent component
    }
  }

  getTagClass(tag: string): string {
    const tagColors: Record<string, string> = {
      technology: 'tag-technology',
      design: 'tag-design',
      business: 'tag-business',
      health: 'tag-health',
      lifestyle: 'tag-lifestyle'
    };
    return tagColors[tag.toLowerCase()] || 'tag-default';
  }

  getImageUrl(imagePath?: string): string {
    return imagePath
      ? `http://127.0.0.1:3002${imagePath}`
      : 'assets/default-article.jpg'; //TODO
  }
}
