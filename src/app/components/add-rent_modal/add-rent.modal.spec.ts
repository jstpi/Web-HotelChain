import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRentModal } from './add-rent.modal';

describe('AddRentModal', () => {
  let component: AddRentModal;
  let fixture: ComponentFixture<AddRentModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRentModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
