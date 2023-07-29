import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TodoActions from './todo.actions';
import { TodoDataService } from '../../infrastructure/todo.data.service';

@Injectable()
export class TodoEffects {
  loadTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodo),
      switchMap((action) =>
        this.todoDataService.load().pipe(
          map((todo) => TodoActions.loadTodoSuccess({ todo })),
          catchError((error) => of(TodoActions.loadTodoFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private todoDataService: TodoDataService
  ) {}
}
