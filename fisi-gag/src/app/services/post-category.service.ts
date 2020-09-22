import { Injectable } from '@angular/core';
import { PostServiceModel } from '../models/post-service.model';

@Injectable({
  providedIn: 'root'
})
export class PostCategoryService {
  categories: PostServiceModel.PostCategory[];

  constructor() {
    this.categories = [{
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
    },
    {
      categoryId: '4',
      category: 'anders-lustig'
    }];
  }

  getAllCategories(){
    return this.categories;
  }

  getCategory(id: string){
    return this.categories.filter(el => el.categoryId === id)[0];
  }

}
