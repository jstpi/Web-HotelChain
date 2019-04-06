import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoomModal } from './edit-room.modal';

describe('EditRoomModal', () => {
  let component: EditRoomModal;
  let fixture: ComponentFixture<EditRoomModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRoomModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoomModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
