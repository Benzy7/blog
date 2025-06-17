import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/layout/header/header.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/layout/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ArticleCardComponent,
    FooterComponent
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
    ArticleCardComponent
  ]
})
export class SharedModule { }
