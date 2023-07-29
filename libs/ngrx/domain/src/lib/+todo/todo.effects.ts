import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {TodoService} from './todo.service';
import * as TodoActions from './todo.actions';
import {Todo} from './todo.model';

@Injectable()
export class TodoEffects implements OnInitEffects {
  onInitTodoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.onInitTodoEffect),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          map((todos: Todo[]) => TodoActions.loadTodos({todos})),
          catchError((message: string) => of(TodoActions.todoError({message})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private todoService: TodoService
  ) {}

  ngrxOnInitEffects(): Action {
    return TodoActions.onInitTodoEffect();
  }
}
