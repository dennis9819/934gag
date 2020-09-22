import { Component, OnInit } from '@angular/core';
import { PostServiceModel } from 'src/app/models/post-service.model';
import { PostCategoryService } from 'src/app/services/post-category.service';

@Component({
  selector: 'app-cat-sidenav',
  templateUrl: './cat-sidenav.component.html',
  styleUrls: ['./cat-sidenav.component.scss']
})
export class CatSidenavComponent implements OnInit {

  channels: PostServiceModel.PostCategory[] = [];

  constructor(
    private categoryService: PostCategoryService,
  ) { }

  ngOnInit(): void {
    this.channels = this.categoryService.getAllCategories();
  }

}

