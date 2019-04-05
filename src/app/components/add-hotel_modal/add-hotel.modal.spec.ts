import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHotelModal } from './add-hotel.modal';

describe('AddHotelModal', () => {
  let component: AddHotelModal;
  let fixture: ComponentFixture<AddHotelModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHotelModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHotelModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
