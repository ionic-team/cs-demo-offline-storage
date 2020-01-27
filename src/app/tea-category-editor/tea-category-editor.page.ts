import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { selectTeaCategory, State } from '@app/store';
import { create, update } from '@app/store/actions/tea-category.actions';

@Component({
  selector: 'app-tea-category-editor',
  templateUrl: './tea-category-editor.page.html',
  styleUrls: ['./tea-category-editor.page.scss']
})
export class TeaCategoryEditorPage implements OnInit {
  private id: number;

  name: string;
  description: string;
  title: string;

  constructor(private route: ActivatedRoute, private navController: NavController, private store: Store<State>) {}

  async ngOnInit() {
    const id = this.idParam();
    if (id) {
      this.initForUpdate(id);
    } else {
      this.initForAdd();
    }
  }

  async save() {
    if (this.id) {
      this.store.dispatch(update({ teaCategory: { id: this.id, name: this.name, description: this.description } }));
    } else {
      this.store.dispatch(create({ teaCategory: { id: this.id, name: this.name, description: this.description } }));
    }
    this.navController.back();
  }

  private idParam(): number {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const n = parseInt(id, 10);
      return isNaN(n) ? undefined : n;
    }
    return undefined;
  }

  private initForAdd() {
    this.title = 'Add New Tea Category';
  }

  private initForUpdate(id: number) {
    this.title = 'Edit Tea Category';
    this.getTeaCategory(id);
  }

  private getTeaCategory(id: number) {
    this.store
      .select(selectTeaCategory, { id })
      .pipe(take(1))
      .subscribe(category => {
        this.id = category.id;
        this.name = category.name;
        this.description = category.description;
      });
  }
}
