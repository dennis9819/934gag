import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTrendingComponent } from './page-trending.component';

describe('PageTrendingComponent', () => {
  let component: PageTrendingComponent;
  let fixture: ComponentFixture<PageTrendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTrendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
