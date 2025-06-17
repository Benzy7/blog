import { Component, OnInit } from '@angular/core';
import { Article } from '../../../core/models/article.model';
import { ArticleService } from '../../../core/services/article.service';

@Component({
  selector: 'app-article-list',
  standalone: false,
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  loading = true;
  error = '';
  searchQuery = '';
  selectedTag = '';

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  private loadArticles(): void {
    this.articleService.getArticles().subscribe({
      next: (articles) => {
        console.log(articles);

        this.articles = articles;
        this.filteredArticles = [...articles];
        this.loading = false;
      },
      error: () => {
        this.error = 'Échec du chargement des articles. Veuillez réessayer plus tard.';
        this.loading = false;
      }
    });
  }

  filterArticles(): void {
    const q = this.searchQuery.trim().toLowerCase();
    this.filteredArticles = this.articles.filter(article => {
      const matchesSearch =
        article.title.toLowerCase().includes(q) ||
        article.content.toLowerCase().includes(q);
      const matchesTag = this.selectedTag
        ? article.tags.includes(this.selectedTag)
        : true;
      return matchesSearch && matchesTag;
    });
  }

  getUniqueTags(): string[] {
    if (!this.articles || !Array.isArray(this.articles)) return [];
    return this.articles.flatMap(article => article.tags || []);
  }

  trackById(_: number, article: Article): string {
    return article._id;
  }
}
