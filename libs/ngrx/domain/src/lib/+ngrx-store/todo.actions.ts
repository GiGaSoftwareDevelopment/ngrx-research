import {createAction, props} from '@ngrx/store';
import {EntityMap, EntityMapOne, Update} from '@ngrx/entity';

import { Todo, TodoParams } from './todo.model';

export const onInitTodoEffect = createAction('[Todo/API] Initial Query Todos');

export const selectTodo = createAction(
  '[Todo/API] Select Todo',
  props<{id: string}>()
);
export const createTodo = createAction(
  '[Todo/API] Create Todo',
  props<{todo: TodoParams}>()
);

export const todoError = createAction(
  '[Todo/API] Error',
  props<{message: string}>()
);

export const queryTodo = createAction(
  '[Todo/API] Query Todos',
  props<{query: string}>()
);

export const loadTodos = createAction(
  '[Todo/API] Load Todos',
  props<{todos: Todo[]}>()
);

export const setTodos = createAction(
  '[Todo/API] Set Todos',
  props<{todos: Todo[]}>()
);

export const addTodo = createAction(
  '[Todo/API] Add Todo',
  props<{todo: Todo}>()
);

export const setTodo = createAction(
  '[Todo/API] Set Todo',
  props<{todo: Todo}>()
);

export const upsertTodo = createAction(
  '[Todo/API] Upsert Todo',
  props<{todo: Todo}>()
);

export const addTodos = createAction(
  '[Todo/API] Add Todos',
  props<{todos: Todo[]}>()
);

export const upsertTodos = createAction(
  '[Todo/API] Upsert Todos',
  props<{todos: Todo[]}>()
);

export const updateTodo = createAction(
  '[Todo/API] Update Todo',
  props<{todo: Update<Todo>}>()
);

export const updateTodos = createAction(
  '[Todo/API] Update Todos',
  props<{todos: Update<Todo>[]}>()
);

export const mapTodo = createAction(
  '[Todo/API] Map Todo',
  props<{entityMap: EntityMapOne<Todo>}>()
);
export const mapTodos = createAction(
  '[Todo/API] Map Todos',
  props<{entityMap: EntityMap<Todo>}>()
);

export const deleteTodo = createAction(
  '[Todo/API] Delete Todo',
  props<{id: string}>()
);

export const deleteTodos = createAction(
  '[Todo/API] Delete Todos',
  props<{ids: string[]}>()
);

export const clearTodos = createAction('[Todo/API] Clear Todos');
