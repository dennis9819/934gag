import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { PageNewComponent } from './components/content/pages/page-new/page-new.component';
import { RouterModule } from '@angular/router';
import { PostListLargeComponent } from './components/content/elements/post-list-large/post-list-large.component';
import { PostListItemLargeComponent } from './components/content/elements/post-list-item-large/post-list-item-large.component';
import { CatSidenavComponent } from './components/content/elements/cat-sidenav/cat-sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavbarComponent,
    PageNewComponent,
    PostListLargeComponent,
    PostListItemLargeComponent,
    CatSidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
