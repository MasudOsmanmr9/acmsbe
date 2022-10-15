import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormDataPageComponent } from './dynamic-form-data-page.component';

describe('DynamicFormDataPageComponent', () => {
  let component: DynamicFormDataPageComponent;
  let fixture: ComponentFixture<DynamicFormDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormDataPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
