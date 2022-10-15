import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsSchemaBuilderComponent } from './forms-schema-builder.component';

describe('FormsSchemaBuilderComponent', () => {
  let component: FormsSchemaBuilderComponent;
  let fixture: ComponentFixture<FormsSchemaBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsSchemaBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsSchemaBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
