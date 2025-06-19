import { Component, Input } from '@angular/core';
import { Article } from '../../../core/models/article.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ArticleService } from '../../../core/services/article.service';

@Component({
  selector: 'app-article-card',
  standalone: false,
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent {
  @Input() article: Article | null = null;
  @Input() showActions = false;

  constructor(
    public authService: AuthService,
    private readonly articleServie: ArticleService,
    private readonly router: Router
  ) { }

  canEdit(): boolean {
    if (!this.authService.isLoggedIn()) return false;

    const user = this.authService.getCurrentUser();
    return (
      user!.role.includes('admin') ||
      user!.role === 'editor' ||
      (user!.role === 'author' && this.article!.authorId === user!._id)
    );
  }

  canDelete(): boolean {
    return this.authService.isLoggedIn() && this.authService.getCurrentUser()!.role.includes('admin');
  }

  viewArticle(): void {
    this.router.navigate(['/articles/view', this.article!._id]);
  }

  editArticle(): void {
    this.router.navigate(['/articles/edit', this.article!._id]);
  }


  //TODO
  deleteArticle(): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article?')) {
      return;
    }

    this.articleServie.deleteArticle(this.article!._id).subscribe({
      next: () => {
        this.router.navigate(['/articles']);
      },
      error: (err) => {
        alert("Échec de la suppression de l'article. Veuillez réessayer.");
        console.error(err);
      }
    });
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
      ? `http://localhost:3002${imagePath}`
      : 'assets/default-article.jpg'; //TODO
  }
}
