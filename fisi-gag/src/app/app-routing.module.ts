import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
