import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModal } from './login.modal';

describe('SearchPage', () => {
  let component: LoginModal;
  let fixture: ComponentFixture<LoginModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
