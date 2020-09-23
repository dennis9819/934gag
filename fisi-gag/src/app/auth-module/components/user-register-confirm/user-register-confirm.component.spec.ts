import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterConfirmComponent } from './user-register-confirm.component';

describe('UserRegisterConfirmComponent', () => {
  let component: UserRegisterConfirmComponent;
  let fixture: ComponentFixture<UserRegisterConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegisterConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
