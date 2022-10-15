import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsListsComponent } from './collections-lists.component';

describe('CollectionsListsComponent', () => {
  let component: CollectionsListsComponent;
  let fixture: ComponentFixture<CollectionsListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionsListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
