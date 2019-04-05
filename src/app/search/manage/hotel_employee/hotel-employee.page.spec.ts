import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelEmployeePage } from './hotel-employee.page';

describe('HotelEmployeePage', () => {
  let component: HotelEmployeePage;
  let fixture: ComponentFixture<HotelEmployeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelEmployeePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
