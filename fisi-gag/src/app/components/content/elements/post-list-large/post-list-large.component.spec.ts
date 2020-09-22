import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListLargeComponent } from './post-list-large.component';

describe('PostListLargeComponent', () => {
  let component: PostListLargeComponent;
  let fixture: ComponentFixture<PostListLargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListLargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
