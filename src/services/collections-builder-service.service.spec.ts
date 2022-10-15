import { TestBed } from '@angular/core/testing';

import { CollectionsBuilderService } from './collections-builder-service.service';

describe('CollectionsBuilderServiceService', () => {
  let service: CollectionsBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionsBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
