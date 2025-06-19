import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../../core/services/article.service';
import { Article } from '../../../core/models/article.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-article-editor',
  standalone: false,
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {
  articleForm: FormGroup;
  isEditMode = false;
  articleId: string | null = null;
  loading = false;
  error = '';
  tagInput = '';
  imagePreview: string | null = null;
  selectedImageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      content: ['', [Validators.required, Validators.minLength(100)]],
      tags: [[]],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.articleId;

    if (this.isEditMode) {
      this.loadArticle();
    } else {
      this.articleForm.patchValue({
        tags: []
      });
    }

    const existingImage = this.articleForm.get('image')?.value;
    if (existingImage) {
      this.imagePreview = existingImage.startsWith('http')
        ? existingImage
        : `http://localhost:3002/${existingImage}`; //TODO
    }
  }

  loadArticle(): void {
    if (!this.articleId) return;

    this.loading = true;
    this.articleService.getArticle(this.articleId).subscribe({
      next: (article) => {
        if (!this.canEditArticle(article)) {
          this.router.navigate(['/']);
          return;
        }

        this.articleForm.patchValue({
          title: article.title,
          content: article.content,
          tags: article.tags,
          image: article.image
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load article. Please try again later.';
        this.loading = false;
      }
    });
  }

  canEditArticle(article: Article): boolean {
    const user = this.authService.getCurrentUser();
    if (!user) return false;

    return (
      user.role === 'admin' ||
      user.role === 'editor' ||
      (user.role === 'author' && article.authorId === user._id)
    );
  }

  addTag(): void {
    if (!this.tagInput.trim()) return;

    const tags = this.articleForm.get('tags')?.value as string[];
    const newTag = this.tagInput.trim();

    if (!tags.includes(newTag)) {
      tags.push(newTag);
      this.articleForm.get('tags')?.setValue(tags);
    }

    this.tagInput = '';
  }

  removeTag(tag: string): void {
    const tags = this.articleForm.get('tags')?.value as string[];
    const index = tags.indexOf(tag);

    if (index !== -1) {
      tags.splice(index, 1);
      this.articleForm.get('tags')?.setValue(tags);
    }
  }
  onSubmit(): void {
    if (this.articleForm.invalid) return;

    this.loading = true;
    this.error = '';

    const formValue = this.articleForm.value;
    const formData = new FormData();

    formData.append('title', formValue.title);
    formData.append('content', formValue.content);
    formValue.tags.forEach((tag: string) => {
      formData.append('tags', tag);
    });
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    const request$ = this.isEditMode && this.articleId
      ? this.articleService.updateArticle(this.articleId, formData)
      : this.articleService.createArticle(formData);

    request$.subscribe({
      next: (article) => {
        this.router.navigate(['/articles/view', article._id]);
      },
      error: () => {
        this.error = this.isEditMode
          ? 'Failed to update article. Please try again.'
          : 'Failed to create article. Please try again.';
        this.loading = false;
      }
    });
  }


  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
