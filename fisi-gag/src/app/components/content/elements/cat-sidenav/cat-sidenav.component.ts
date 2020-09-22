import { Component, OnInit } from '@angular/core';
import { PostServiceModel } from 'src/app/models/post-service.model';

@Component({
  selector: 'app-cat-sidenav',
  templateUrl: './cat-sidenav.component.html',
  styleUrls: ['./cat-sidenav.component.scss']
})
export class CatSidenavComponent implements OnInit {

  channels: PostServiceModel.PostCategory[] = [
    {
      categoryId: '1',
      category: 'memes'
    },
    {
      categoryId: '2',
      category: 'informatiker'
    },
    {
      categoryId: '3',
      category: 'linux'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

