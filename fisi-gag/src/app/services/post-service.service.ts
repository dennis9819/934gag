import { Injectable } from '@angular/core';
import { PostServiceModel } from '../models/post-service.model';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  // dummy data
  private posts: PostServiceModel.PostEntity[] =  [{
    title: 'testbeitrag',
    postId: '12343',
    userId: '2321',
    userName: 'osuoz99yeco',
    points: 34112,
    comments: 7823,
    categories: [
      {
        categoryId: '2',
        category: 'Informatiker'
      } as PostServiceModel.PostCategory
    ],
    content: `Dies ist ein Text-Beitrag`,
    postDate: new Date('2020-09-23T11:10:43+00:00'),
    contentType: 'text'
  },
  {
    title: '😛',
    postId: '22',
    userId: '2321',
    userName: 'osuoz99yeco',
    points: 34112,
    comments: 7823,
    categories: [
      {
        categoryId: '2',
        category: 'Informatiker'
      } as PostServiceModel.PostCategory
    ],
    mediaUrl: 'https://i.redd.it/osuoz99yeco51.jpg',
    postDate: new Date('2020-09-19T11:10:43+00:00'),
    contentType: 'picture'
  },
  {
    title: 'Testobjekt',
    postId: '7823',
    userId: '72839423',
    userName: 'dennis9819',
    points: 34112,
    comments: 7823,
    categories: [
      {
        categoryId: '1',
        category: 'Memes'
      } as PostServiceModel.PostCategory
    ],
    mediaUrl: 'https://img-9gag-fun.9cache.com/photo/aEPO62G_460swp.webp',
    postDate: new Date('2020-09-01T11:10:43+00:00'),
    contentType: 'picture'
  },
  {
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
  }];

  constructor() {

  }

  // Get All Posts
  public getPosts(): PostServiceModel.PostEntity[] {
    return this.posts;
  }

  // Get Single Post
  public getPost(id: string): PostServiceModel.PostEntity {
    return this.posts.filter(el => el.postId === id)[0];
  }

  // Upvote Post
  public upvotePost(id: string): void {
    const post = this.posts.filter(el => el.postId === id);
    if (post.length === 0){ throw new Error('Post not found!'); }
    post[0].points += 1;
  }

  // Upvote Post
  public downvotePost(id: string): void {
    const post = this.posts.filter(el => el.postId === id);
    if (post.length === 0){ throw new Error('Post not found!'); }
    post[0].points -= 1;
  }

  public getPostByCategory(id: string) {
    return this.posts.filter(el => el.categories[0].categoryId === id);
  }
}


