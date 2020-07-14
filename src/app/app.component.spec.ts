import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { State } from '@app/store/reducers';
import { load as loadTeaCategories } from '@app/store/actions/tea-category.actions';
import { createPlatformMock } from '@test/mocks';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: StatusBar,
          useFactory: () => jasmine.createSpyObj('StatusBar', ['styleDefault']),
        },
        {
          provide: SplashScreen,
          useFactory: () => jasmine.createSpyObj('SplashScreen', ['hide']),
        },
        { provide: Platform, useFactory: createPlatformMock },
        provideMockStore<State>(),
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('initialization', () => {
    let platform;
    beforeEach(() => {
      platform = TestBed.get(Platform);
    });

    it('waits for the platform to be read', () => {
      TestBed.createComponent(AppComponent);
      expect(platform.ready).toHaveBeenCalledTimes(1);
    });

    it('hides the splash screen', async () => {
      const splashScreen = TestBed.get(SplashScreen);
      TestBed.createComponent(AppComponent);
      expect(splashScreen.hide).not.toHaveBeenCalled();
      await platform.ready();
      expect(splashScreen.hide).toHaveBeenCalledTimes(1);
    });

    it('sets the proper status bar style', async () => {
      const statusBar = TestBed.get(StatusBar);
      TestBed.createComponent(AppComponent);
      expect(statusBar.styleDefault).not.toHaveBeenCalled();
      await platform.ready();
      expect(statusBar.styleDefault).toHaveBeenCalledTimes(1);
    });

    it('dispatches loading of the tea categories', async () => {
      const store = TestBed.get(Store);
      spyOn(store, 'dispatch');
      TestBed.createComponent(AppComponent);
      expect(store.dispatch).not.toHaveBeenCalled();
      await platform.ready();
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(loadTeaCategories());
    });
  });
});
