import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ArticleViewComponent } from './article-view/article-view.component';

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  {
    path: 'create',
    component: ArticleEditorComponent,
  },
  {
    path: 'view/:id',
    component: ArticleViewComponent,
  },
  {
    path: 'edit/:id',
    component: ArticleEditorComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
