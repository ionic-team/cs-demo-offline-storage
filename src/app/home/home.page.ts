import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { TeaCategory } from '@app/models';
import { State } from '@app/store/reducers';
import { selectAllTeaCategories } from '@app/store/selectors';
import { remove } from '@app/store/actions/tea-category.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  databaseName: string;
  databasePath: string;
  categories$: Observable<Array<TeaCategory>>;

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    private store: Store<State>,
  ) {}

  ngOnInit() {
    this.categories$ = this.store.pipe(select(selectAllTeaCategories));
  }

  addTeaCategory() {
    this.navController.navigateForward(['tea-category-editor']);
  }

  editTeaCategory(teaCategory: TeaCategory) {
    this.navController.navigateForward(['tea-category-editor', teaCategory.id]);
  }

  async removeTeaCategory(teaCategory: TeaCategory): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to permanently remove this category?',
      buttons: [{ text: 'Yes' }, { text: 'No', role: 'cancel' }],
    });
    alert.present();
    const res = await alert.onDidDismiss();
    if (res.role !== 'cancel') {
      this.store.dispatch(remove({ teaCategory }));
    }
  }
}
