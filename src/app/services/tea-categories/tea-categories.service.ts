import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { SQLite, SQLiteObject, DbTransaction } from '@ionic-enterprise/offline-storage/ngx';
import { TeaCategory } from '@app/models';
import { Platform } from '@ionic/angular';

interface Column {
  name: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeaCategoriesService {
  private handle: SQLiteObject;
  private readyPromise: Promise<void>;
  private isReady = false;
  private changedSubject: BehaviorSubject<void>;

  get changed(): Observable<void> {
    return this.changedSubject.asObservable();
  }

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.changedSubject = new BehaviorSubject(null);
    this.readyPromise = this.initializeDatabase();
  }

  async getAll(): Promise<Array<TeaCategory>> {
    const cats: Array<TeaCategory> = [];
    await this.readyPromise;
    await this.handle.transaction(tx =>
      tx.executeSql('SELECT * FROM TeaCategories ORDER BY name', [], (_t, r) => {
        for (let i = 0; i < r.rows.length; i++) {
          cats.push(r.rows.item(i));
        }
      })
    );
    return cats;
  }

  async get(id: string): Promise<TeaCategory> {
    let cat: TeaCategory = null;
    await this.readyPromise;
    await this.handle.transaction(tx => {
      tx.executeSql('SELECT * FROM TeaCategories WHERE id = ? ORDER BY name', [id], (_t, r) => {
        if (r.rows.length) {
          cat = { ...r.rows.item(0) };
        }
      })
    });
    return cat;
  }

  async save(category: TeaCategory): Promise<TeaCategory> {
    return category.id ? this.update(category) : this.add(category);
  }

  async delete(id: string): Promise<void> {
    await this.readyPromise;
    await this.handle.transaction(tx => tx.executeSql('DELETE FROM TeaCategories WHERE id = ?', [id], () => {}));
    this.changedSubject.next();
  }

  private async add(category: TeaCategory): Promise<TeaCategory> {
    await this.readyPromise;
    const cat = { ...category };
    await this.handle.transaction(tx  => {
      tx.executeSql('SELECT COALESCE(MAX(id), 0) + 1 AS newId FROM TeaCategories', [], (_t, r) => {
        cat.id = r.rows.item(0).newId;
        tx.executeSql(
          'INSERT INTO TeaCategories (id, name, description) VALUES (?, ?, ?)',
          [cat.id, cat.name, cat.description],
          () => {}
        );
      });
    });
    this.changedSubject.next();
    return cat;
  }

  private async update(category: TeaCategory): Promise<TeaCategory> {
    await this.readyPromise;
    this.handle.transaction(tx => {
      tx.executeSql(
        'UPDATE TeaCategories SET name = ?, description = ? WHERE id = ?',
        [category.name, category.description, category.id],
        () => {}
      );
    });
    this.changedSubject.next();
    return category;
  }

  private async initializeDatabase(): Promise<void> {
    await this.platform.ready();
    await this.open();
    await this.handle.transaction(tx => {
      this.createTables(tx);
    });
    this.isReady = true;
  }

  private async open(): Promise<void> {
    this.handle = await this.sqlite.create({
      name: 'teaisforme.db',
      location: 'default'
    });
  }

  private createTables(transaction: DbTransaction): void {
    const id = { name: 'id', type: 'INTEGER PRIMARY KEY' };
    const name = { name: 'name', type: 'TEXT' };
    const description = { name: 'description', type: 'TEXT' };
    transaction.executeSql(this.createTableSQL('TeaCategories', [id, name, description]));
  }

  private createTableSQL(name: string, columns: Array<Column>): string {
    let cols = '';
    columns.forEach((c, i) => {
      cols += `${i ? ', ' : ''}${c.name} ${c.type}`;
    });
    return `CREATE TABLE IF NOT EXISTS ${name} (${cols})`;
  }

  private async ready(): Promise<boolean> {
    if (!this.isReady) {
      await this.readyPromise;
    }
    return true;
  }
}
