import { createSQLiteObjectMock } from '@test/mocks';
import { deepCopy } from '@test/util';

export function createDatabaseServiceMock() {
  const mock = jasmine.createSpyObj('DatabaseService', {
    ready: Promise.resolve(true),
  });
  mock.handle = createSQLiteObjectMock();
  return mock;
}

export class MockResultRows<T> {
  private data: Array<T>;
  constructor(d: Array<T>) {
    this.data = deepCopy(d);
  }

  get length(): number {
    return this.data ? this.data.length : 0;
  }

  item(idx: number): T {
    return this.data[idx];
  }
}
