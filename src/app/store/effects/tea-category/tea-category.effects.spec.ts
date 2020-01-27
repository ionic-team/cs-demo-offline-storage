import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { TeaCategoryEffects } from './tea-category.effects';
import * as teaCategoryActions from '@app/store/actions/tea-category.actions';
import { TeaCategory } from '@app/models';
import { TeaCategoriesService } from '@app/services';
import { createTeaCategoriesServiceMock } from '@app/services/tea-categories/tea-categories.service.mock';

let actions$: Observable<any>;
let effects: TeaCategoryEffects;

describe('tea category effects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TeaCategoryEffects,
        { provide: TeaCategoriesService, useFactory: createTeaCategoriesServiceMock },
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<TeaCategoryEffects>(TeaCategoryEffects);
  });

  it('exists', () => {
    expect(effects).toBeTruthy();
  });

  describe('load$', () => {
    it('gets all of the tea categories', () => {
      const service = TestBed.get(TeaCategoriesService);
      actions$ = of(teaCategoryActions.load());
      effects.load$.subscribe(() => {});
      expect(service.getAll).toHaveBeenCalledTimes(1);
    });

    it('only does this for the load action', () => {
      const service = TestBed.get(TeaCategoriesService);
      actions$ = of(teaCategoryActions.create({ teaCategory: { id: 1, name: 'name', description: 'descr' } }));
      effects.load$.subscribe(() => {});
      expect(service.getAll).not.toHaveBeenCalled();
    });

    it('passes the tea catgories on to the load success', done => {
      const service = TestBed.get(TeaCategoriesService);
      service.getAll.and.returnValue(
        Promise.resolve([
          { id: 1, name: 'first', description: 'the first type' },
          { id: 2, name: 'second', description: 'the second type' },
          { id: 3, name: 'third', description: 'the third type' }
        ])
      );
      actions$ = of(teaCategoryActions.load());
      effects.load$.subscribe(action => {
        expect(action).toEqual(
          teaCategoryActions.loadSuccess({
            teaCategories: [
              { id: 1, name: 'first', description: 'the first type' },
              { id: 2, name: 'second', description: 'the second type' },
              { id: 3, name: 'third', description: 'the third type' }
            ]
          })
        );
        done();
      });
    });

    it('handles errors', done => {
      const service = TestBed.get(TeaCategoriesService);
      service.getAll.and.returnValue(Promise.reject(new Error('I am a failure')));
      actions$ = of(teaCategoryActions.load());
      effects.load$.subscribe(action => {
        expect(action).toEqual(teaCategoryActions.loadFailure({ error: new Error('I am a failure') }));
        done();
      });
    });
  });

  describe('create$', () => {
    it('saves the tea category', () => {
      const service = TestBed.get(TeaCategoriesService);
      actions$ = of(
        teaCategoryActions.create({
          teaCategory: { name: 'I am new here', description: 'I did not exist before today' }
        })
      );
      effects.create$.subscribe(() => {});
      expect(service.save).toHaveBeenCalledTimes(1);
      expect(service.save).toHaveBeenCalledWith({ name: 'I am new here', description: 'I did not exist before today' });
    });

    it('only does this for the create action', () => {
      const service = TestBed.get(TeaCategoriesService);
      actions$ = of(teaCategoryActions.load());
      effects.create$.subscribe(() => {});
      expect(service.save).not.toHaveBeenCalled();
    });

    it('passes the returned tea catgory on to the create success', done => {
      const service = TestBed.get(TeaCategoriesService);
      service.save.and.returnValue(
        Promise.resolve({ id: 42, name: 'I am new here', description: 'I did not exist before today' })
      );
      actions$ = of(
        teaCategoryActions.create({
          teaCategory: { name: 'I am new here', description: 'I did not exist before today' }
        })
      );
      effects.create$.subscribe(action => {
        expect(action).toEqual(
          teaCategoryActions.createSuccess({
            teaCategory: {
              id: 42,
              name: 'I am new here',
              description: 'I did not exist before today'
            }
          })
        );
        done();
      });
    });

    it('handles errors', done => {
      const service = TestBed.get(TeaCategoriesService);
      service.save.and.returnValue(Promise.reject(new Error('I am a failure')));
      actions$ = of(
        teaCategoryActions.create({
          teaCategory: { name: 'I am new here', description: 'I did not exist before today' }
        })
      );
      effects.create$.subscribe(action => {
        expect(action).toEqual(teaCategoryActions.createFailure({ error: new Error('I am a failure') }));
        done();
      });
    });
  });

  describe('update$', () => {
    it('saves the tea category', () => {
      const service = TestBed.get(TeaCategoriesService);
      actions$ = of(
        teaCategoryActions.update({
          teaCategory: { id: 42, name: 'I am a changed tea', description: 'I did not say this before' }
        })
      );
      effects.update$.subscribe(() => {});
      expect(service.save).toHaveBeenCalledTimes(1);
      expect(service.save).toHaveBeenCalledWith({
        id: 42,
        name: 'I am a changed tea',
        description: 'I did not say this before'
      });
    });

    it('only does this for the update action', () => {
      const service = TestBed.get(TeaCategoriesService);
      actions$ = of(teaCategoryActions.load());
      effects.update$.subscribe(() => {});
      expect(service.save).not.toHaveBeenCalled();
    });

    it('passes the tea catgory on to the update success', done => {
      const service = TestBed.get(TeaCategoriesService);
      service.save.and.returnValue(
        Promise.resolve({ id: 42, name: 'I am a changed tea', description: 'I did not say this before' })
      );
      actions$ = of(
        teaCategoryActions.update({
          teaCategory: { id: 42, name: 'I am a changed tea', description: 'I did not say this before' }
        })
      );
      effects.update$.subscribe(action => {
        expect(action).toEqual(
          teaCategoryActions.updateSuccess({
            teaCategory: { id: 42, name: 'I am a changed tea', description: 'I did not say this before' }
          })
        );
        done();
      });
    });

    it('handles errors', done => {
      const service = TestBed.get(TeaCategoriesService);
      service.save.and.returnValue(Promise.reject(new Error('I am a failure')));
      actions$ = of(
        teaCategoryActions.update({
          teaCategory: { id: 42, name: 'I am a changed tea', description: 'I did not say this before' }
        })
      );
      effects.update$.subscribe(action => {
        expect(action).toEqual(teaCategoryActions.updateFailure({ error: new Error('I am a failure') }));
        done();
      });
    });
  });

  describe('delete$', () => {
    it('deletes the tea category', () => {
      const service = TestBed.get(TeaCategoriesService);
      actions$ = of(
        teaCategoryActions.remove({
          teaCategory: { id: 42, name: 'Delete Me', description: 'I am sad to be leaving you' }
        })
      );
      effects.delete$.subscribe(() => {});
      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(service.delete).toHaveBeenCalledWith(42);
    });

    it('only does this for the delete action', () => {
      const service = TestBed.get(TeaCategoriesService);
      actions$ = of(teaCategoryActions.load());
      effects.delete$.subscribe(() => {});
      expect(service.delete).not.toHaveBeenCalled();
    });

    it('passes the tea catgory on to the delete success', done => {
      actions$ = of(
        teaCategoryActions.remove({
          teaCategory: { id: 42, name: 'Delete Me', description: 'I am sad to be leaving you' }
        })
      );
      effects.delete$.subscribe(action => {
        expect(action).toEqual(
          teaCategoryActions.removeSuccess({
            teaCategory: { id: 42, name: 'Delete Me', description: 'I am sad to be leaving you' }
          })
        );
        done();
      });
    });

    it('handles errors', done => {
      const service = TestBed.get(TeaCategoriesService);
      service.delete.and.returnValue(Promise.reject(new Error('I am a failure')));
      actions$ = of(
        teaCategoryActions.remove({
          teaCategory: { id: 42, name: 'Delete Me', description: 'I am sad to be leaving you' }
        })
      );
      effects.delete$.subscribe(action => {
        expect(action).toEqual(teaCategoryActions.removeFailure({ error: new Error('I am a failure') }));
        done();
      });
    });
  });
});
