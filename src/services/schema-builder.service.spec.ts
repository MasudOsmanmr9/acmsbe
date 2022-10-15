import { TestBed } from '@angular/core/testing';

import { SchemaBuilderService } from './schema-builder.service';

describe('SchemaBuilderService', () => {
  let service: SchemaBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemaBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
