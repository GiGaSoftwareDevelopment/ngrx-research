import {Action, createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Todo} from './todo.model';
import * as TodoActions from './todo.actions';

export const todosFeatureKey = 'todos';

export function selectTodoId(a: Todo): string {
  //In this case this would be optional since primary key is id
  return a.id;
}

export interface TodoState extends EntityState<Todo> {
  // additional entities state properties
   isLoaded: boolean;
   isLoading: boolean;
   error: string | null;
}


export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
   selectId: selectTodoId,
});

export const initialTodoState: TodoState = todoAdapter.getInitialState({
  // additional entity state properties
    isLoaded: false,
    isLoading: true,
    error: null,
});

export const todoReducer = createReducer(
  initialTodoState,
  on(TodoActions.addTodo, (state, { todo }) => todoAdapter.addOne(todo, state)),
  on(TodoActions.setTodo, (state, { todo }) => {
      return todoAdapter.setOne(todo, state)
  }),
  on(TodoActions.upsertTodo, (state, { todo }) => todoAdapter.upsertOne(todo, state)),
  on(TodoActions.addTodos, (state, { todos }) => todoAdapter.addMany(todos, state)),
  on(TodoActions.upsertTodos, (state, { todos }) => todoAdapter.upsertMany(todos, state)),
  on(TodoActions.updateTodo, (state, { todo }) => todoAdapter.updateOne(todo, state)),
  on(TodoActions.updateTodos, (state, { todos }) => todoAdapter.updateMany(todos, state)),
  on(TodoActions.mapTodo, (state, { entityMap }) => {
    return todoAdapter.mapOne(entityMap, state);
  }),
  on(TodoActions.mapTodos, (state, { entityMap }) => {
    return todoAdapter.map(entityMap, state);
  }),
  on(TodoActions.deleteTodo, (state, { id }) => todoAdapter.removeOne(id, { ...state, error: null })),
  on(TodoActions.deleteTodos, (state, { ids }) => todoAdapter.removeMany(ids, state)),
  on(TodoActions.loadTodos, (state, { todos }) =>
                                                            todoAdapter.setAll(todos, { ...state, isLoaded: true, isLoading: false })
                                                        ),
  on(TodoActions.setTodos, (state, { todos }) => {
    return todoAdapter.setMany(todos, state);
  }),
  on(TodoActions.clearTodos, state => todoAdapter.removeAll({ ...state, isLoaded: false })),
  on(TodoActions.todoError, (state, { message }) => ({ ...state, error: message })),
  // on(loadApis, (state) => ({ ...state, isLoading: true }))
);


