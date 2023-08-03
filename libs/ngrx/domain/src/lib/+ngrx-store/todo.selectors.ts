import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as TodoReducer from './todo.reducer';
import { Dictionary } from '@ngrx/entity';
import { Todo } from './todo.model';

export const selectTodoState = createFeatureSelector<TodoReducer.TodoState>(
  TodoReducer.todosFeatureKey
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  TodoReducer.todoAdapter.getSelectors();

export const selectAllTodos = createSelector(selectTodoState, selectAll);
export const selectTodoEntities = createSelector(
  selectTodoState,
  selectEntities
);
export const selectTodoIds = createSelector(selectTodoState, selectIds);
export const selectTodoTotal = createSelector(selectTodoState, selectTotal);

// START
export const selectCurrentTodoId = createSelector(
  selectTodoState,
  (state: TodoReducer.TodoState) => state.selectedId
);


export const selectCurrentTodo = createSelector(
  selectTodoEntities,
  selectCurrentTodoId,
  (entities, todoId): Todo | null => {
    if (todoId && entities[todoId] !== undefined && entities[todoId] !== null) {
      return <Todo>entities[todoId]
    }
    return null;
  }
);

// END

export const selectTodoLoadingInProgress = createSelector(
  selectTodoState,
  (state: TodoReducer.TodoState) => state.isLoading
);

export const selectDeletedTodos = () => {

  let currentEntities: Dictionary<Todo> = {}

  return createSelector(
    selectTodoEntities,
    (entities: Dictionary<Todo>): Todo[] => {

      const deletedEntities = Object.keys(currentEntities)
        .reduce((result: { [key: string]: Todo }, key: string) => {
          if (!entities[key] && currentEntities[key]) {
            result[key] = <Todo>currentEntities[key];
          }
          return result;
        }, {});

      currentEntities = {
        ...entities
      };

      return Object.values(deletedEntities
      );
    }
  );
}

export const selectTodoError = createSelector(
  selectTodoState,
  (state: TodoReducer.TodoState) => state.error
);

export const selectTodoLoaded = createSelector(
  selectTodoState,
  (state: TodoReducer.TodoState) => state.isLoaded
);

export const selectTodoLoading = createSelector(
  selectTodoState,
  (state: TodoReducer.TodoState) => state.isLoading
);


export const selectIsFirstTodoSelected = createSelector(
  selectTodoIds,
  selectCurrentTodoId,
  (ids, currentId) => {
    if (ids.length > 0 && currentId) {
      return ids[0] === currentId;
    }

    //
    return true;
  }
);

export const selectIsLastTodoSelected = createSelector(
  selectTodoIds,
  selectCurrentTodoId,
  (ids, currentId) => {
    if (ids.length > 0 && currentId) {
      return ids[ids.length - 1] === currentId;
    }

    // Used for disabling the next button
    // if there are no todos or the last todo is selected
    return true;
  });

