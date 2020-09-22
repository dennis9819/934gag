import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNewComponent } from './components/content/pages/page-new/page-new.component';


const routes: Routes = [
  {
    path: 'content/new',
    component: PageNewComponent
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
