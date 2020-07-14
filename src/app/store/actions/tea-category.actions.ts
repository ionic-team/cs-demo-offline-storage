import { createAction, props } from '@ngrx/store';
import { TeaCategory } from '@app/models';

export enum TeaCategoryActionTypes {
  create = '[TeaCategory Editor] add tea category',
  createSuccess = '[TeaCategories API] create success',
  createFailure = '[TeaCategories API] create failure',

  update = '[TeaCategory Editor] update tea category',
  updateSuccess = '[TeaCategories API] update success',
  updateFailure = '[TeaCategories API] update failure',

  remove = '[TeaCategory Editor] remove tea category',
  removeSuccess = '[TeaCategories API] remove success',
  removeFailure = '[TeaCategories API] remove failure',

  load = '[Application] load tea categories',
  loadSuccess = '[TeaCategories API] load success',
  loadFailure = '[TeaCategories API] load failure',
}

export const create = createAction(
  TeaCategoryActionTypes.create,
  props<{ teaCategory: TeaCategory }>(),
);
export const createSuccess = createAction(
  TeaCategoryActionTypes.createSuccess,
  props<{ teaCategory: TeaCategory }>(),
);
export const createFailure = createAction(
  TeaCategoryActionTypes.createFailure,
  props<{ error: Error }>(),
);

export const update = createAction(
  TeaCategoryActionTypes.update,
  props<{ teaCategory: TeaCategory }>(),
);
export const updateSuccess = createAction(
  TeaCategoryActionTypes.updateSuccess,
  props<{ teaCategory: TeaCategory }>(),
);
export const updateFailure = createAction(
  TeaCategoryActionTypes.updateFailure,
  props<{ error: Error }>(),
);

export const remove = createAction(
  TeaCategoryActionTypes.remove,
  props<{ teaCategory: TeaCategory }>(),
);
export const removeSuccess = createAction(
  TeaCategoryActionTypes.removeSuccess,
  props<{ teaCategory: TeaCategory }>(),
);
export const removeFailure = createAction(
  TeaCategoryActionTypes.removeFailure,
  props<{ error: Error }>(),
);

export const load = createAction(TeaCategoryActionTypes.load);
export const loadSuccess = createAction(
  TeaCategoryActionTypes.loadSuccess,
  props<{ teaCategories: Array<TeaCategory> }>(),
);
export const loadFailure = createAction(
  TeaCategoryActionTypes.loadFailure,
  props<{ error: Error }>(),
);
