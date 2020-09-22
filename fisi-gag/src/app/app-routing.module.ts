import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './components/content/pages/auth/user-login/user-login.component';
import { UserLogoutComponent } from './components/content/pages/auth/user-logout/user-logout.component';
import { UserRegisterComponent } from './components/content/pages/auth/user-register/user-register.component';
import { UserWelcomeComponent } from './components/content/pages/auth/user-welcome/user-welcome.component';
import { PageCategoriesComponent } from './components/content/pages/page-categories/page-categories.component';
import { PageCategoryComponent } from './components/content/pages/page-category/page-category.component';
import { PageNewComponent } from './components/content/pages/page-new/page-new.component';
import { PagePopularComponent } from './components/content/pages/page-popular/page-popular.component';
import { PageTrendingComponent } from './components/content/pages/page-trending/page-trending.component';


const routes: Routes = [
  {
    path: 'content/new',
    component: PageNewComponent
  },
  {
    path: 'content/popular',
    component: PagePopularComponent
  },
  {
    path: 'content/trending',
    component: PageTrendingComponent
  },
  {
    path: 'content/channel',
    component: PageCategoriesComponent
  },
  {
    path: 'content/channel/:id',
    component: PageCategoryComponent
  },
  {
    path: 'auth',
    component: UserWelcomeComponent
  },
  {
    path: 'auth/login',
    component: UserLoginComponent
  },
  {
    path: 'auth/logout',
    component: UserLogoutComponent
  },
  {
    path: 'auth/register',
    component: UserRegisterComponent
  },
  {
    path: '',
    redirectTo: '/content/new',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
