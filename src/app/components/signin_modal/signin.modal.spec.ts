import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninModal } from './signin.modal';

describe('SearchPage', () => {
  let component: SigninModal;
  let fixture: ComponentFixture<SigninModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
