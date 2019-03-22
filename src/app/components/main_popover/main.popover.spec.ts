import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPopover } from './main.popover';

describe('SearchPage', () => {
  let component: MainPopover;
  let fixture: ComponentFixture<MainPopover>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPopover ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPopover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
