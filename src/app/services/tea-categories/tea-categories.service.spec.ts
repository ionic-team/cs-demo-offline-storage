import { TestBed } from '@angular/core/testing';

import { TeaCategoriesService } from './tea-categories.service';
import { DatabaseService } from '../database/database.service';
import { createDatabaseServiceMock } from '../database/database.service.mock';

describe('TeaCategoriesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        { provide: DatabaseService, useFactory: createDatabaseServiceMock },
      ],
    }),
  );

  it('should be created', () => {
    const service: TeaCategoriesService = TestBed.inject(TeaCategoriesService);
    expect(service).toBeTruthy();
  });
});
