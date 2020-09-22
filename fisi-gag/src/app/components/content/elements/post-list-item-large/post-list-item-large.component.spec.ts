import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListItemLargeComponent } from './post-list-item-large.component';

describe('PostListItemLargeComponent', () => {
  let component: PostListItemLargeComponent;
  let fixture: ComponentFixture<PostListItemLargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListItemLargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListItemLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
