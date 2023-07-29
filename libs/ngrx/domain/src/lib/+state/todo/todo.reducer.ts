import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as TodoActions from './todo.actions';
import { Todo } from '../../entities/todo';

export const TODO_FEATURE_KEY = 'ngrx-todo';

export interface State extends EntityState<Todo> {
  selectedId?: string | number; // which Todo record has been selected
  loaded: boolean; // has the Todo list been loaded
  error?: string | null; // last known error (if any)
}

export interface TodoPartialState {
  readonly [TODO_FEATURE_KEY]: State;
}

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: State = todoAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodo, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(TodoActions.loadTodoSuccess, (state, { todo }) =>
    todoAdapter.upsertMany(todo, { ...state, loaded: true })
  ),
  on(TodoActions.loadTodoFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return todoReducer(state, action);
}
