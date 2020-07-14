import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import * as TeaCategoryActions from '@app/store/actions/tea-category.actions';
import { TeaCategory } from '@app/models';

export interface TeaCategoriesState extends EntityState<TeaCategory> {
  loading: boolean;
  error?: Error;
}

const adapter = createEntityAdapter<TeaCategory>();

export const initialState = adapter.getInitialState({ loading: false });

const teaCategoryReducer = createReducer<TeaCategoriesState>(
  initialState,
  on(TeaCategoryActions.load, state =>
    adapter.removeAll({ ...state, loading: true, error: undefined }),
  ),
  on(TeaCategoryActions.loadSuccess, (state, { teaCategories }) =>
    adapter.addMany(teaCategories, { ...state, loading: false }),
  ),
  on(TeaCategoryActions.loadFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(TeaCategoryActions.create, state => ({
    ...state,
    loading: true,
    error: undefined,
  })),
  on(TeaCategoryActions.createSuccess, (state, { teaCategory }) =>
    adapter.addOne(teaCategory, { ...state, loading: false }),
  ),
  on(TeaCategoryActions.createFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(TeaCategoryActions.update, state => ({
    ...state,
    loading: true,
    error: undefined,
  })),
  on(TeaCategoryActions.updateSuccess, (state, { teaCategory }) =>
    adapter.updateOne(
      { id: teaCategory.id, changes: teaCategory },
      { ...state, loading: false },
    ),
  ),
  on(TeaCategoryActions.updateFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(TeaCategoryActions.remove, state => ({
    ...state,
    loading: true,
    error: undefined,
  })),
  on(TeaCategoryActions.removeSuccess, (state, { teaCategory }) =>
    adapter.removeOne(teaCategory.id, { ...state, loading: false }),
  ),
  on(TeaCategoryActions.removeFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // on(TeaCategoryActions.timerRemoved, (state, { timer }) => adapter.removeOne(timer.id, { ...state, loading: false }))
);

export function reducer(state: TeaCategoriesState | undefined, action: Action) {
  return teaCategoryReducer(state, action);
}

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
export const selectors = {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
};
