import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectors } from '@app/store/reducers/tea-category/tea-category.reducer';

export const selectTaskTypes = createFeatureSelector('teaCategories');
export const selectAllTeaCategories = createSelector(
  selectTaskTypes,
  selectors.selectAll,
);
export const selectTeaCategory = createSelector(
  selectAllTeaCategories,
  (teaCategories, props) => teaCategories.find(t => t.id === props.id),
);
