import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoomPage } from './user-room.page';

describe('SearchPage', () => {
  let component: UserRoomPage;
  let fixture: ComponentFixture<UserRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
