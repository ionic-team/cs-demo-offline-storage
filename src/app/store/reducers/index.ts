import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@env/environment';

import * as fromTeaCategory from './tea-category/tea-category.reducer';

export interface State {
  teaCategories: fromTeaCategory.TeaCategoriesState;
}

export const reducers: ActionReducerMap<State> = {
  teaCategories: fromTeaCategory.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
