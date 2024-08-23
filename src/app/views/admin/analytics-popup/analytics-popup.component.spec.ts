import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsPopupComponent } from './analytics-popup.component';

describe('AnalyticsPopupComponent', () => {
  let component: AnalyticsPopupComponent;
  let fixture: ComponentFixture<AnalyticsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
