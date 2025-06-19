import { Component, Input } from '@angular/core';
import { CommentService } from '../../../core/services/comment.service';

@Component({
  selector: 'app-article-comment',
  standalone: false,
  templateUrl: './article-comment.component.html',
  styleUrl: './article-comment.component.css'
})
export class ArticleCommentComponent {
  @Input() comment!: any;
  @Input() articleId!: string;
  showReplyForm = false;
  replyContent = '';

  constructor(private readonly commentService: CommentService) { }

  toggleReply() {
    this.showReplyForm = !this.showReplyForm;
  }

  addReply() {
    if (this.replyContent.trim()) {
      this.commentService.createComment(
        this.articleId,
        this.replyContent,
        this.comment._id
      ).subscribe(newReply => {
        this.comment.replies = this.comment.replies || [];
        this.comment.replies.unshift(newReply);
        this.replyContent = '';
        this.showReplyForm = false;
      });
    }
  }
}
