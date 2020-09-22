import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatSidenavComponent } from './cat-sidenav.component';

describe('CatSidenavComponent', () => {
  let component: CatSidenavComponent;
  let fixture: ComponentFixture<CatSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
