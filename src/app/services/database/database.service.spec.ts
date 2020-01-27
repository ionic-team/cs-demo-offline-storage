import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { createSQLiteMock, createSQLiteObjectMock, createPlatformMock } from '@test/mocks';
import { SQLite } from '@ionic-enterprise/offline-storage/ngx';
import { Platform } from '@ionic/angular';

describe('DatabaseService', () => {
  let sqlite;
  let dbHandle;

  beforeEach(() => {
    sqlite = createSQLiteMock();
    dbHandle = createSQLiteObjectMock();
    sqlite.create.and.returnValue(Promise.resolve(dbHandle));
    TestBed.configureTestingModule({
      providers: [
        { provide: Platform, useFactory: createPlatformMock },
        { provide: SQLite, useValue: sqlite }
      ]
    });
  });

  it('should be created', () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    expect(service).toBeTruthy();
  });

  describe('when ready', () => {
    let service: DatabaseService;
    beforeEach(() => {
      service = TestBed.get(DatabaseService);
    });

    it('has a handle for the database', async () => {
      await service.ready();
      expect(service.handle).toEqual(dbHandle);
    });

    it('has opened the database', async () => {
      await service.ready();
      expect(sqlite.create).toHaveBeenCalledTimes(1);
      expect(sqlite.create).toHaveBeenCalledWith({
        name: 'teaisforme.db',
        location: 'default'
      });
    });
  });
});
