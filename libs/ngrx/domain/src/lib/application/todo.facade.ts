import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loadTodo } from '../+state/todo/todo.actions';
import * as fromTodo from '../+state/todo/todo.reducer';
import * as TodoSelectors from '../+state/todo/todo.selectors';

@Injectable({ providedIn: 'root' })
export class TodoFacade {
  loaded$ = this.store.pipe(select(TodoSelectors.getTodoLoaded));
  todoList$ = this.store.pipe(select(TodoSelectors.getAllTodo));
  selectedTodo$ = this.store.pipe(select(TodoSelectors.getSelected));

  constructor(private store: Store<fromTodo.TodoPartialState>) {}

  load(): void {
    this.store.dispatch(loadTodo());
  }
}
