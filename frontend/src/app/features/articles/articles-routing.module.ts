import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  {
    path: 'create',
    component: ArticleEditorComponent,
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
