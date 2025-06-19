import { Component, Input } from '@angular/core';
import { ArticleComment } from '../../../core/models/article-comment.model';
import { CommentService } from '../../../core/services/comment.service';

@Component({
  selector: 'app-article-comments',
  standalone: false,
  templateUrl: './article-comments.component.html',
  styleUrl: './article-comments.component.css'
})
export class ArticleCommentsComponent {
  @Input() articleId!: string;
  comments: ArticleComment[] = [];
  newComment = '';

  constructor(private readonly commentService: CommentService) { }

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getCommentsByArticle(this.articleId).subscribe(
      comments => this.comments = comments
    );
  }

  addComment() {
    if (this.newComment.trim()) {
      this.commentService.createComment(this.articleId, this.newComment)
        .subscribe(newComment => {
          this.comments = [newComment, ...this.comments];
          this.newComment = '';
        });
    }
  }
}
