import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Plugins, StatusBarStyle } from '@capacitor/core';

import { Platform } from '@ionic/angular';
import { State } from './store/reducers';
import { load as loadTeaCategories } from './store/actions/tea-category.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(private platform: Platform, private store: Store<State>) {
    this.initializeApp();
  }

  initializeApp() {
    if (this.platform.is('hybrid')) {
      const { SplashScreen, StatusBar } = Plugins;
      StatusBar.setStyle({ style: StatusBarStyle.Light });
      SplashScreen.hide();
    }
    this.store.dispatch(loadTeaCategories());
  }
}
