import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import {
  DbTransaction,
  SQLite,
  SQLiteObject,
} from '@ionic-enterprise/offline-storage/ngx';

interface Column {
  name: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  public handle: SQLiteObject;
  private readyPromise: Promise<boolean>;
  private isReady = false;

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.readyPromise = this.initializeSchema();
  }

  async ready(): Promise<boolean> {
    if (!this.isReady) {
      await this.readyPromise;
    }
    return true;
  }

  private async initializeSchema(): Promise<boolean> {
    await this.platform.ready();
    await this.open();
    return this.handle
      .transaction(tx => {
        this.createTables(tx);
      })
      .then(() => {
        this.isReady = true;
        return true;
      });
  }

  private async open(): Promise<void> {
    this.handle = await this.sqlite.create({
      name: 'teaisforme.db',
      location: 'default',
    });
  }

  private createTables(transaction: DbTransaction): void {
    const id = { name: 'id', type: 'INTEGER PRIMARY KEY' };
    const name = { name: 'name', type: 'TEXT' };
    const description = { name: 'description', type: 'TEXT' };
    transaction.executeSql(
      this.createTableSQL('TeaCategories', [id, name, description]),
    );
    transaction.executeSql(
      this.createTableSQL('Teas', [
        id,
        name,
        description,
        { name: 'teaCategoryRid', type: 'INTEGER' },
      ]),
    );
  }

  private createTableSQL(name: string, columns: Array<Column>): string {
    let cols = '';
    columns.forEach((c, i) => {
      cols += `${i ? ', ' : ''}${c.name} ${c.type}`;
    });
    return `CREATE TABLE IF NOT EXISTS ${name} (${cols})`;
  }
}
