import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelRoomPage } from './hotel-room.page';

describe('HotelRoomPage', () => {
  let component: HotelRoomPage;
  let fixture: ComponentFixture<HotelRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelRoomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
