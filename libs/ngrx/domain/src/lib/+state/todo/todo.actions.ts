import { createAction, props } from '@ngrx/store';
import { Todo } from '../../entities/todo';

export const loadTodo = createAction('[Todo] Load Todo');

export const loadTodoSuccess = createAction(
  '[Todo] Load Todo Success',
  props<{ todo: Todo[] }>()
);

export const loadTodoFailure = createAction(
  '[Todo] Load Todo Failure',
  props<{ error: any }>()
);
