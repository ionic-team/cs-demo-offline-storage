import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { TeaCategoriesService } from '@app/services';
import * as teaCategoryActions from '@app/store/actions/tea-category.actions';
import { TeaCategory } from '@app/models';

@Injectable()
export class TeaCategoryEffects {
  constructor(
    private actions$: Actions,
    private teaCategoryService: TeaCategoriesService,
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teaCategoryActions.load),
      mergeMap(() =>
        from(this.teaCategoryService.getAll()).pipe(
          map(cats => teaCategoryActions.loadSuccess({ teaCategories: cats })),
          catchError(error => of(teaCategoryActions.loadFailure({ error }))),
        ),
      ),
    ),
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teaCategoryActions.create),
      mergeMap(action =>
        from(this.teaCategoryService.save(action.teaCategory)).pipe(
          map(cat => teaCategoryActions.createSuccess({ teaCategory: cat })),
          catchError(error => of(teaCategoryActions.createFailure({ error }))),
        ),
      ),
    ),
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teaCategoryActions.update),
      mergeMap(action =>
        from(this.teaCategoryService.save(action.teaCategory)).pipe(
          map(cat => teaCategoryActions.updateSuccess({ teaCategory: cat })),
          catchError(error => of(teaCategoryActions.updateFailure({ error }))),
        ),
      ),
    ),
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teaCategoryActions.remove),
      mergeMap(action =>
        from(this.teaCategoryService.delete(action.teaCategory.id)).pipe(
          map(() =>
            teaCategoryActions.removeSuccess({
              teaCategory: action.teaCategory,
            }),
          ),
          catchError(error => of(teaCategoryActions.removeFailure({ error }))),
        ),
      ),
    ),
  );
}
