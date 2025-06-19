import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/layout/header/header.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ArticleCommentComponent } from './components/article-comment/article-comment.component';
import { ArticleCommentsComponent } from './components/article-comments/article-comments.component';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { NotificationBellComponent } from './components/notification-bell/notification-bell.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ArticleCardComponent,
    FooterComponent,
    ArticleCommentComponent,
    ArticleCommentsComponent,
    MarkdownPipe,
    NotificationBellComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    ArticleCardComponent,
    ArticleCommentComponent,
    ArticleCommentsComponent,
    MarkdownPipe,
    NotificationBellComponent
  ]
})
export class SharedModule { }
