import { Dictionary } from '@ngrx/entity';

import { initialState, reducer } from './tea-category.reducer';
import {
  TeaCategoryActionTypes,
  createFailure,
  updateFailure,
  removeFailure,
  loadFailure,
  loadSuccess,
  createSuccess,
  updateSuccess,
  removeSuccess
} from '@app/store/actions/tea-category.actions';
import { TeaCategory } from '@app/models';

let testCats: Dictionary<TeaCategory>;
let testCatsArray: Array<TeaCategory>;
let testCatIds: Array<number>;

beforeEach(() => {
  initializeTestData();
});

it('returns the default state', () => {
  expect(reducer(undefined, { type: 'NOOP' })).toEqual(initialState);
});

describe(TeaCategoryActionTypes.load, () => {
  it('sets loading true, removes any entities, and undefines any error', () => {
    expect(
      reducer(
        {
          ...initialState,
          ids: [...testCatIds],
          entities: { ...testCats },
          error: new Error('the last load failed')
        },
        { type: TeaCategoryActionTypes.load }
      )
    ).toEqual({
      ...initialState,
      loading: true,
      error: undefined
    });
  });
});

describe(TeaCategoryActionTypes.loadSuccess, () => {
  it('sets the data and clears the loading flag', () => {
    const action = loadSuccess({ teaCategories: testCatsArray });
    expect(reducer({ ...initialState, loading: true }, action)).toEqual({
      ...initialState,
      loading: false,
      ids: [...testCatIds],
      entities: { ...testCats }
    });
  });
});

describe(TeaCategoryActionTypes.loadFailure, () => {
  it('sets the error and clears the loading flag', () => {
    const action = loadFailure({ error: new Error('Could not load the data') });
    expect(reducer({ ...initialState, loading: true }, action)).toEqual({
      ...initialState,
      loading: false,
      error: new Error('Could not load the data')
    });
  });
});

describe(TeaCategoryActionTypes.create, () => {
  it('sets loading true and undefines any error', () => {
    expect(
      reducer({ ...initialState, error: new Error('the last create failed') }, { type: TeaCategoryActionTypes.create })
    ).toEqual({
      ...initialState,
      loading: true,
      error: undefined
    });
  });
});

describe(TeaCategoryActionTypes.createSuccess, () => {
  it('adds to an empty state', () => {
    const action = createSuccess({ teaCategory: { id: 17, name: 'New Tea', description: 'I am a new type of tea' } });
    expect(reducer({ ...initialState, loading: true }, action)).toEqual({
      ...initialState,
      loading: false,
      ids: [17],
      entities: {
        17: {
          id: 17,
          name: 'New Tea',
          description: 'I am a new type of tea'
        }
      }
    });
  });

  it('adds to a populated state', () => {
    const action = createSuccess({ teaCategory: { id: 17, name: 'New Tea', description: 'I am a new type of tea' } });
    expect(
      reducer({ ...initialState, ids: [...testCatIds], entities: { ...testCats }, loading: true }, action)
    ).toEqual({
      ...initialState,
      loading: false,
      ids: [...testCatIds, 17],
      entities: {
        ...testCats,
        17: {
          id: 17,
          name: 'New Tea',
          description: 'I am a new type of tea'
        }
      }
    });
  });
});

describe(TeaCategoryActionTypes.createFailure, () => {
  it('sets the error and clears the loading flag', () => {
    const action = createFailure({ error: new Error('Could not create the data') });
    expect(reducer({ ...initialState, loading: true }, action)).toEqual({
      ...initialState,
      loading: false,
      error: new Error('Could not create the data')
    });
  });
});

describe(TeaCategoryActionTypes.update, () => {
  it('sets loading true and undefines any error', () => {
    expect(
      reducer({ ...initialState, error: new Error('the last update failed') }, { type: TeaCategoryActionTypes.update })
    ).toEqual({
      ...initialState,
      loading: true,
      error: undefined
    });
  });
});

describe(TeaCategoryActionTypes.updateSuccess, () => {
  it('updates the item', () => {
    const action = updateSuccess({
      teaCategory: { id: 3, name: 'this is a new name', description: 'this is a new description' }
    });
    const expected = { ...testCats };
    expected[3] = {
      id: 3,
      name: 'this is a new name',
      description: 'this is a new description'
    };
    expect(
      reducer({ ...initialState, loading: true, ids: [...testCatIds], entities: { ...testCats } }, action)
    ).toEqual({
      ...initialState,
      loading: false,
      ids: [...testCatIds],
      entities: expected
    });
  });
});

describe(TeaCategoryActionTypes.updateFailure, () => {
  it('sets the error and clears the loading flag', () => {
    const action = updateFailure({ error: new Error('Could not update the data') });
    expect(reducer({ ...initialState, loading: true }, action)).toEqual({
      ...initialState,
      loading: false,
      error: new Error('Could not update the data')
    });
  });
});

describe(TeaCategoryActionTypes.remove, () => {
  it('sets loading true and undefines any error', () => {
    expect(
      reducer({ ...initialState, error: new Error('the last remove failed') }, { type: TeaCategoryActionTypes.remove })
    ).toEqual({
      ...initialState,
      loading: true,
      error: undefined
    });
  });
});

describe(TeaCategoryActionTypes.removeSuccess, () => {
  it('removes the specified item', () => {
    const action = removeSuccess({
      teaCategory: {
        id: 7,
        name: 'White',
        description:
          'White tea is produced using very young shoots with no oxidation process. White tea has an extremely delicate flavor that is sweet and fragrent. White tea should be steeped at lower temperatures for short periods of time.'
      }
    });
    const expected = { ...testCats };
    delete expected[7];
    expect(
      reducer({ ...initialState, loading: true, ids: [...testCatIds], entities: { ...testCats } }, action)
    ).toEqual({
      ...initialState,
      loading: false,
      ids: [1, 2, 3, 5, 11, 13],
      entities: expected
    });
  });
});

describe(TeaCategoryActionTypes.removeFailure, () => {
  it('sets the error and clears the loading flag', () => {
    const action = removeFailure({ error: new Error('Could not remove the data') });
    expect(reducer({ ...initialState, loading: true }, action)).toEqual({
      ...initialState,
      loading: false,
      error: new Error('Could not remove the data')
    });
  });
});

function initializeTestData() {
  testCatIds = [1, 2, 3, 5, 7, 11, 13];
  testCats = {
    1: {
      id: 1,
      name: 'Puer',
      description:
        'An aged black tea from china. Puer teas have a strong rich flavor that could be described as "woody" or "peaty."'
    },
    2: {
      id: 2,
      name: 'Herbal',
      description:
        'Herbal infusions are not actually "tea" but are more accurately characterized as infused beverages consisting of various dried herbs, spices, and fruits and other yummy things.'
    },
    3: {
      id: 3,
      name: 'Black',
      description:
        'A fully oxidized tea, black teas have a dark color and a full robust and pronounced flavor. Black teas tend to have a higher caffeine content than other teas.'
    },
    5: {
      id: 5,
      name: 'Dark',
      description:
        'From the Hunan and Sichuan provinces of China, dark teas are flavorful aged probiotic teas that steeps up very smooth with slightly sweet notes.'
    },
    7: {
      id: 7,
      name: 'White',
      description:
        'White tea is produced using very young shoots with no oxidation process. White tea has an extremely delicate flavor that is sweet and fragrent. White tea should be steeped at lower temperatures for short periods of time.'
    },
    11: {
      id: 11,
      name: 'Yellow',
      description:
        'A rare tea from China, yellow tea goes through a similar shortened oxidation process like green teas. Yellow teas, however, do not have the grassy flavor that green teas tend to have. The leaves often resemble the shoots of white teas, but are slightly oxidized.'
    },
    13: {
      id: 13,
      name: 'Green',
      description:
        'Green teas have the oxidation process stopped very early on, leaving them with a very subtle flavor and complex undertones. These teas should be steeped at lower temperatures for shorter periods of time.dffdsfs'
    }
  };

  testCatsArray = [];
  testCatIds.forEach(id => testCatsArray.push(testCats[id]));
}
