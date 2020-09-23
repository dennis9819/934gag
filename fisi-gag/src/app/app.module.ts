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
import { PagePopularComponent } from './components/content/pages/page-popular/page-popular.component';
import { PageTrendingComponent } from './components/content/pages/page-trending/page-trending.component';
import { PageCategoryComponent } from './components/content/pages/page-category/page-category.component';
import { PageCategoriesComponent } from './components/content/pages/page-categories/page-categories.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BackgroundComponent } from './auth-module/components/background/background.component';
import { AuthModule } from './auth-module/auth.module';
import { UserRegisterNextComponent } from './auth-module/components/user-register-next/user-register-next.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavbarComponent,
    PageNewComponent,
    PostListLargeComponent,
    PostListItemLargeComponent,
    CatSidenavComponent,
    PagePopularComponent,
    PageTrendingComponent,
    PageCategoryComponent,
    PageCategoriesComponent,
    BackgroundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
