import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';

import { DatabaseService } from '@app/services';
import { TeaCategoryEditorPage } from './tea-category-editor.page';
import { State } from '@app/store';

import { createNavControllerMock, createActivatedRouteMock } from '@test/mocks';
import { createDatabaseServiceMock } from '@app/services/database/database.service.mock';

describe('TeaCategoryEditorPage', () => {
  let component: TeaCategoryEditorPage;
  let fixture: ComponentFixture<TeaCategoryEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeaCategoryEditorPage],
      imports: [IonicModule, FormsModule],
      providers: [
        { provide: ActivatedRoute, useFactory: createActivatedRouteMock },
        { provide: DatabaseService, useFactory: createDatabaseServiceMock },
        { provide: Location, useValue: {} },
        { provide: NavController, useFactory: createNavControllerMock },
        provideMockStore<State>()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaCategoryEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
