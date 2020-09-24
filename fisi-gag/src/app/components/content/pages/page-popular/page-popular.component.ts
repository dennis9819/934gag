import { Component, OnInit } from '@angular/core';
import { PostServiceModel } from 'src/app/models/post-service.model';
import { PostServiceService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-page-popular',
  templateUrl: './page-popular.component.html',
  styleUrls: ['./page-popular.component.scss']
})
export class PagePopularComponent implements OnInit {

  constructor(
    private postService: PostServiceService
  ) {

  }

  posts: PostServiceModel.PostEntity[];

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
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
