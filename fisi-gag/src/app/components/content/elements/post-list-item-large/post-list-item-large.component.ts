import { Component, Input, OnInit } from '@angular/core';
import { PostServiceModel } from 'src/app/models/post-service.model';

@Component({
  selector: 'app-post-list-item-large',
  templateUrl: './post-list-item-large.component.html',
  styleUrls: ['./post-list-item-large.component.scss']
})
export class PostListItemLargeComponent implements OnInit {

  constructor() {
    this.loaded = false;
  }

  // tslint:disable-next-line: variable-name
  _data: PostServiceModel.PostEntity;

  @Input()
  set data(value: PostServiceModel.PostEntity) {
    this._data = value;
    this.loaded = true;
    this.dateString = this.generateDateString();

  }

  loaded: boolean;
  dateString: string;
  ngOnInit(): void {

  }

  private generateDateString(): string{
    const dateDiff: number = new Date().getTime() - this._data.postDate.getTime();
    const seconds = Math.round(dateDiff / 1000);
    if (seconds < 60){
      return `${seconds}s`;
    }
    const minutes = Math.round(seconds / 60);
    if (minutes < 60){
      return `${minutes}m`;
    }
    const hours = Math.round(minutes / 60);
    if (hours < 24){
      return `${hours}h`;
    }
    const days = Math.round(hours / 24);
    if (days < 7){
      return `${days} day${days > 1 ? 's' : ''}`;
    }
    const weeks = Math.round(days / 7);
    if (weeks < 4){
      return `${weeks} week${weeks > 1 ? 's' : ''}`;
    }
    const month = Math.round(weeks / 4);
    if (month < 12){
      return `${month} month`;
    }
    const years = Math.round(month / 12);
    return `${years} year${years > 1 ? 's' : ''}`;
  }

}
