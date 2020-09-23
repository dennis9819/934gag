import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterNextComponent } from './user-register-next.component';

describe('UserRegisterNextComponent', () => {
  let component: UserRegisterNextComponent;
  let fixture: ComponentFixture<UserRegisterNextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegisterNextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
