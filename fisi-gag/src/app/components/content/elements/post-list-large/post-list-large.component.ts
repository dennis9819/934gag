import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostServiceModel } from 'src/app/models/post-service.model';

@Component({
  selector: 'app-post-list-large',
  templateUrl: './post-list-large.component.html',
  styleUrls: ['./post-list-large.component.scss']
})
export class PostListLargeComponent implements OnInit {
  @Input()
  postList: PostServiceModel.PostEntity[];

  public pushPostData(posts: PostServiceModel.PostEntity[]){
    posts.forEach(post => {
      this.postList.push(post);
    });
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
