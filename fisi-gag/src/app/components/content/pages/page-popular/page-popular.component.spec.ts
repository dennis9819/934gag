import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePopularComponent } from './page-popular.component';

describe('PagePopularComponent', () => {
  let component: PagePopularComponent;
  let fixture: ComponentFixture<PagePopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
