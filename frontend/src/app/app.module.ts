import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HasRoleDirective } from './shared/directives/has-role.directive';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; // <-- add this
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HasRoleDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
