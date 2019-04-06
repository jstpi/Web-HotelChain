import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomModal } from './add-room.modal';

describe('AddRoomModal', () => {
  let component: AddRoomModal;
  let fixture: ComponentFixture<AddRoomModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoomModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
