import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { SharedModule } from '../../shared/shared.module';
import { ArticleViewComponent } from './article-view/article-view.component';


@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleEditorComponent,
    ArticleViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
