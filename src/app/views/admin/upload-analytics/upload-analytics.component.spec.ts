import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAnalyticsComponent } from './upload-analytics.component';

describe('UploadAnalyticsComponent', () => {
  let component: UploadAnalyticsComponent;
  let fixture: ComponentFixture<UploadAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
