import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Todo } from './todo.model';
import * as TodoActions from './todo.actions';

export const todosFeatureKey = 'todos';

export function selectTodoId(a: Todo): string {
  //In this case this would be optional since primary key is id
  return a.id;
}

export interface TodoState extends EntityState<Todo> {
  // additional entities state properties
  selectedId: string | number | null;
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}


export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: selectTodoId
});

export const initialTodoState: TodoState = todoAdapter.getInitialState({
  // additional entity state properties
  selectedId: null,
  isLoaded: false,
  isLoading: true,
  error: null
});

function selectFirstIdIfNoIdSelected(state: TodoState): TodoState {
  if (state.selectedId !== null && state.selectedId !== undefined) {
    return state;
  }
  const firstId: string | number | undefined = state.ids[0];
  if (firstId !== undefined) {
    return { ...state, selectedId: firstId };
  }
  return state;
}

function selectPreviousIdIfCurrentDeleted(state: TodoState, deletedIds: string[] | number[]): TodoState {

  const selectedId: string | number | null = state.selectedId;

  if (selectedId !== null && selectedId !== undefined && state.ids.length > 0) {

    // .indexOf types only work with string[]
    const deletedIdsContainSelectedId: boolean = (<string[]>deletedIds).indexOf(<string>selectedId) > -1;

    if (!deletedIdsContainSelectedId) {
      return state;
    }

    // .indexOf types only work with string[]
    const previousId: string | number | never = state.ids[(<string[]>state.ids).indexOf(<string>selectedId) - 1];
    const nextId: string | number | never = state.ids[(<string[]>state.ids).indexOf(<string>selectedId) + 1];

    if (previousId !== undefined) {
      return { ...state, selectedId: previousId };
    } else if (nextId !== undefined) {
      return { ...state, selectedId: nextId };
    } else {
      return { ...state, selectedId: null };
    }
  }

  return state;
}


export const todoReducer = createReducer(
  initialTodoState,
  on(TodoActions.selectTodo, (state, { id }) => {
    return { ...state, selectedId: id }
  }),
  on(TodoActions.addTodo, (state, { todo }) => selectFirstIdIfNoIdSelected(todoAdapter.addOne(todo, state))),
  on(TodoActions.setTodo, (state, { todo }) => selectFirstIdIfNoIdSelected(todoAdapter.setOne(todo, state))),
  on(TodoActions.upsertTodo, (state, { todo }) => selectFirstIdIfNoIdSelected(todoAdapter.upsertOne(todo, state))),
  on(TodoActions.addTodos, (state, { todos }) => selectFirstIdIfNoIdSelected(todoAdapter.addMany(todos, state))),
  on(TodoActions.upsertTodos, (state, { todos }) => selectFirstIdIfNoIdSelected(todoAdapter.upsertMany(todos, state))),
  on(TodoActions.updateTodo, (state, { todo }) => selectFirstIdIfNoIdSelected(todoAdapter.updateOne(todo, state))),
  on(TodoActions.updateTodos, (state, { todos }) => selectFirstIdIfNoIdSelected(todoAdapter.updateMany(todos, state))),
  on(TodoActions.mapTodo, (state, { entityMap }) => todoAdapter.mapOne(entityMap, state)),
  on(TodoActions.mapTodos, (state, { entityMap }) => todoAdapter.map(entityMap, state)),
  on(TodoActions.deleteTodo, (state, { id }) => selectPreviousIdIfCurrentDeleted(todoAdapter.removeOne(id, {
    ...state,
    error: null
  }), [id])),
  on(TodoActions.deleteTodos, (state, { ids }) => selectPreviousIdIfCurrentDeleted(todoAdapter.removeMany(ids, state), ids)),
  on(TodoActions.loadTodos, (state, { todos }) =>
    selectFirstIdIfNoIdSelected(todoAdapter.setAll(todos, { ...state, isLoaded: true, isLoading: false }))
  ),
  on(TodoActions.setTodos, (state, { todos }) => selectFirstIdIfNoIdSelected(todoAdapter.setMany(todos, state))),
  on(TodoActions.clearTodos, state => todoAdapter.removeAll({ ...state, isLoaded: false, selectedId: null })),
  on(TodoActions.todoError, (state, { message }) => ({ ...state, error: message })),
  on(TodoActions.nextTodo, (state) => {
    const selectedId = state.selectedId;
    const ids: string[] | number[] = state.ids;

    if (ids.length > 0) {
      if (selectedId !== null && selectedId !== undefined) {
        const index = ids.findIndex((i: string | number) => i === selectedId);
        if (index !== -1) {
          const nextIndex = index + 1;
          if (nextIndex < ids.length) {
            return { ...state, selectedId: ids[nextIndex] };
          } else {
            return { ...state, selectedId: ids[0] };
          }
        } else {
          return { ...state, selectedId: ids[0] };
        }
      } else {
        return { ...state, selectedId: ids[0] };
      }
    } else {
      return { ...state, selectedId: null };
    }
  }),
  on(TodoActions.previousTodo, (state) => {
    const selectedId = state.selectedId;
    const ids: string[] | number[] = state.ids;

    if (ids.length > 0) {
      if (selectedId !== null && selectedId !== undefined) {
        const index = ids.findIndex((i: string | number) => i === selectedId);
        if (index !== -1) {
          const previousIndex = index - 1;
          if (previousIndex >= 0) {
            return { ...state, selectedId: ids[previousIndex] };
          } else {
            return { ...state, selectedId: ids[ids.length - 1] };
          }
        } else {
          return { ...state, selectedId: ids[ids.length - 1] };
        }
      } else {
        return { ...state, selectedId: ids[ids.length - 1] };
      }
    } else {
      return { ...state, selectedId: null };
    }
  })
  // on(loadApis, (state) => ({ ...state, isLoading: true }))
);


