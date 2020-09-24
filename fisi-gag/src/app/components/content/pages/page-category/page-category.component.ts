import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostServiceModel } from 'src/app/models/post-service.model';
import { PostCategoryService } from 'src/app/services/post-category.service';
import { PostServiceService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-page-category',
  templateUrl: './page-category.component.html',
  styleUrls: ['./page-category.component.scss']
})
export class PageCategoryComponent implements OnInit {

  constructor(
    private postService: PostServiceService,
    private categoryService: PostCategoryService,
    private router: ActivatedRoute
  ) {

  }

  category: PostServiceModel.PostCategory;
  posts: PostServiceModel.PostEntity[];

  ngOnInit(): void {
    this.router.params.subscribe(param => {
      this.category = this.categoryService.getCategory(param.id);
      this.posts = this.postService.getPostByCategory(param.id);
    });
  }

  loadMore(): void {
    this.posts.push({
      title: 'What a day to be alive',
      postId: '3423',
      userId: '72839423',
      userName: 'bernd',
      points: 3242,
      comments: 8910,
      categories: [
        {
          categoryId: '1',
          category: 'Memes'
        } as PostServiceModel.PostCategory
      ],
      mediaUrl: 'https://i.redd.it/iu0nx7j8tfo51.png',
      postDate: new Date('2020-06-01T11:10:43+00:00'),
      contentType: 'picture'
    });
  }
}
