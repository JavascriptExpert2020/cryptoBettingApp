import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEducationComponent } from './upload-education.component';

describe('UploadEducationComponent', () => {
  let component: UploadEducationComponent;
  let fixture: ComponentFixture<UploadEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
