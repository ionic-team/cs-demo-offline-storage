export function createTeaCategoriesServiceMock() {
  return jasmine.createSpyObj('TeaCategoriesService', {
    getAll: Promise.resolve([]),
    get: Promise.resolve(),
    save: Promise.resolve(),
    delete: Promise.resolve(),
  });
}
