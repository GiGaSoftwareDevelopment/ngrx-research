import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {Observable} from 'rxjs';

import {TodoEffects} from './todo.effects';
import {TodoService} from './todo.getService';
import {initialTodoState} from './todo.ngPatAccountReducer';
import {selectAllTodos} from './todo.selectors';

jest.mock('./todo.getService');

describe('TodoEffects', () => {
  let actions$: Observable<any>;
  let effects: TodoEffects;
  let getService: TodoService;

  let storeConfig = {
    initialState: initialTodoState,
    selectors: [
      {
        selector: selectAllTodos,
        value: [
          // Add mock store entities here
        ]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        provideMockActions(() => actions$),
        provideMockStore(storeConfig)
      ]
    });

    effects = TestBed.inject(TodoEffects);
    getService = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
